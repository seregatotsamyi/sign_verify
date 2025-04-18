"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function uploadSign(docId: any, cookieHeader: any) {
  // Создаем новый объект FormData для отправки на внешний API
  console.log(cookieHeader);
  const idDocument = docId;
  const dataForSend = JSON.stringify({
    DocumentIds: [idDocument],
  });
  try {
    const responseTwo = await fetch("https://dss.cryptopro.ru/verify/rest/api/signatures/package/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // Пробрасываем все куки
      },
      body: dataForSend,
    });
    console.log(responseTwo.json());

    return { responseTwo, status: 200 };
  } catch (e) {
    console.error(e);
    return {
      error: e,
      status: 400,
    };
  }
}
