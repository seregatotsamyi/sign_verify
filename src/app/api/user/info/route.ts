import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "Не передан id пользователя" }, { status: 400 });
  }

  const totalRequests = await prisma.verificationResult.count({
    where: {
      userId: userId,
    },
  });

  const successfulRequests = await prisma.verificationResult.count({
    where: {
      userId: userId,
      result: true,
    },
  });

  const failedRequests = await prisma.verificationResult.count({
    where: {
      userId: userId,
      result: false,
    },
  });

  return NextResponse.json(
    {
      totalRequests,
      successfulRequests,
      failedRequests,
    },
    { status: 200 }
  );
}
