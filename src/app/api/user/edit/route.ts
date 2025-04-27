import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  console.log(requestBody.name);

  if (!requestBody.name || !requestBody.login || !requestBody.id) {
    return NextResponse.json({ error: "Не переданы все параметры" }, { status: 400 });
  }

  try {
    if (requestBody.name) {
      await prisma.user.update({
        where: {
          id: requestBody.id,
        },
        data: {
          name: requestBody.name,
        },
      });
    }

    if (requestBody.login) {
      await prisma.user.update({
        where: {
          id: requestBody.id,
        },
        data: {
          email: requestBody.login,
        },
      });
    }
    return NextResponse.json(
      {
        message: "Успешно",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Ошибка",
        error: error,
      },
      { status: 500 }
    );
  }
}
