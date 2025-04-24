import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { reportApiType } from "../../../../types/common";
import { prisma } from "../../../../prisma/prisma";

export type SignaturesData = {
  Content: string;
  SignatureType: "0" | "1" | "2" | "3" | "4" | "5";
};

function getFileExtension(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return "";
  }
  return filename.substring(lastDotIndex + 1).toLowerCase();
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const fileName = searchParams.get("fileName");

  let type = null;

  if (!fileName) {
    return NextResponse.json({ error: "Пустой запрос" }, { status: 400 });
  }

  const typeString = getFileExtension(fileName);

  if (typeString) {
    switch (typeString) {
      case "pdf": {
        type = 3;
        break;
      }
      case "doc": {
        type = 4;
        break;
      }
      case "docx": {
        type = 4;
        break;
      }
      case "xls": {
        type = 4;
        break;
      }
      case "xlsx": {
        type = 4;
        break;
      }
      case "p7s": {
        type = 5;
        break;
      }
      case "sig": {
        type = 5;
        break;
      }
      case "sgn": {
        type = 5;
        break;
      }
      case "cer": {
        type = 2;
        break;
      }
    }
  } else {
    return NextResponse.json({ error: "Ну удалось опознать формат" }, { status: 400 });
  }

  return NextResponse.json({ type });
}

export async function POST(req: Request) {
  const session = await auth();
  const requestBody = await req.json();

  if (!session) {
    return NextResponse.json({ error: "Нет авторизационных данных" }, { status: 400 });
  }

  if (!requestBody) {
    return NextResponse.json({ error: "Пустой запрос" }, { status: 400 });
  }
  //Извлекаем данные из запроса
  const fileName = requestBody?.docName;
  const info: reportApiType = requestBody?.information;

  if (!fileName) {
    return NextResponse.json({ error: "Не хватает параметров" }, { status: 400 });
  }

  try {
    const verificationResult = await prisma.verificationResult.create({
      data: {
        userId: session.user.userId,
        result: info.Result,
        documentName: fileName,
        ...(info.Message && { Message: info.Message }),
        ...(info.SignatureInfo && {
          signatureType: info.SignatureInfo.CAdESType,
          signatureTime: info.SignatureInfo.LocalSigningTime,
        }),
        ...(info.SignerCertificateInfo && {
          issuerName: info.SignerCertificateInfo.IssuerName,
          notAfter: info.SignerCertificateInfo.NotAfter,
          notBefore: info.SignerCertificateInfo.NotBefore,
          subjectName: info.SignerCertificateInfo.SubjectName,
          scopeSerialNumber: info.SignerCertificateInfo.SerialNumber,
          thumbprint: info.SignerCertificateInfo.Thumbprint,
        }),
      },
    });
    console.log(verificationResult);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сохранения результатов" }, { status: 400 });
  }

  return NextResponse.json({ message: "Успешно" }, { status: 200 });

  //const response = await uploadSign({ dataForSend });

  // if (response.error) {
  //   return NextResponse.json({ error: response.error }, { status: response.status });
  // }

  return NextResponse.json({ error: "Непредвиденная ошибка" }, { status: 500 });
}
