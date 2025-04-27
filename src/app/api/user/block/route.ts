import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();

  if (requestBody.block === null || !requestBody.id) {
    return NextResponse.json({ error: "Не переданы все параметры" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id: requestBody.id,
      },
      data: {
        isBlock: requestBody.block,
      },
    });

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
