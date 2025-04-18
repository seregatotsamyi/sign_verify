import { uploadSign } from "@/app/actions/uploadSign";
import { NextResponse } from "next/server";
import cookie from "cookie";
import axios from "axios";

export async function POST(req) {
  // URL для первого запроса
  const verifyUrl = "https://dss.cryptopro.ru/verify/rest/api/documents";
  // URL для второго запроса
  const signaturesUrl = "https://dss.cryptopro.ru/verify/rest/api/signatures/package/session";
  // Проверяем данные из запроса

  // if (!docId) {
  //   return NextResponse.json({ error: "Нет id" }, { status: 400 });
  // }
  const formData = new FormData();
  formData.append("file", req.body.file);

  const response = await axios.post(verifyUrl, formData, {
    headers: {
      ...formData.getHeaders(), // Добавляем заголовки для FormData
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Позволяет отправлять куки
  });

  const response = await uploadSign(docId, cookies);

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: response.status });
  }
  if (response.responseData) {
    return NextResponse.json(response.responseData, { status: 200 });
  }
  return NextResponse.json({ error: "Непредвиденная ошибка" }, { status: 500 });
}
