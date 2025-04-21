import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

const prisma = new PrismaClient();

export type SignaturesData = {
  Content: string;
  SignatureType: "0" | "1" | "2" | "3" | "4" | "5";
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const fileName = searchParams.get("fileName");

  if (!fileName) {
    return NextResponse.json({ error: "Пустой запрос" }, { status: 400 });
  }

  return NextResponse.json({ type: 3 });
}

export async function POST(req: Request) {
  const session = await auth();
  console.log(session);
  const requestBody = await req.json();

  if (!requestBody) {
    return NextResponse.json({ error: "Пустой запрос" }, { status: 400 });
  }
  //Извлекаем данные из запроса
  const fileName = requestBody?.docName;

  if (!fileName) {
    return NextResponse.json({ error: "Не хватает параметров" }, { status: 400 });
  }

  return NextResponse.json({ message: "Успешно" }, { status: 200 });

  //const response = await uploadSign({ dataForSend });

  // if (response.error) {
  //   return NextResponse.json({ error: response.error }, { status: response.status });
  // }

  return NextResponse.json({ error: "Непредвиденная ошибка" }, { status: 500 });
}
