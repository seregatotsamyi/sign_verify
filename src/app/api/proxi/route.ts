import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
  const verifyUrl = "https://dss.cryptopro.ru/verify/rest/api/documents";
  const signaturesUrl = "https://dss.cryptopro.ru/verify/rest/api/signatures";

  try {
    // Получаем данные из запроса
    const formData = await req.formData(); // Используем formData() для получения данных
    const file = formData.get("file"); // Получаем файл из FormData

    // Создаем новый объект FormData для первого запроса
    const dataToSend = new FormData();
    dataToSend.append("document", file);

    // Первый запрос для получения куки
    const response = await axios.post(verifyUrl, dataToSend, {
      headers: {
        ...dataToSend.getHeaders(), // Добавляем заголовки для FormData
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Позволяет отправлять куки
    });

    // Получаем куки из ответа
    const cookies = response.headers["set-cookie"];

    // Извлекаем строку из ответа (предполагается, что она находится в response.data)
    const stringToSend = response.data.id;
    const NameFile = response.data.Name;
    console.log("cookies", cookies);
    console.log("stringToSend", stringToSend);
    console.log("NameFile", NameFile);
    const dataToSendTwo = new FormData();
    dataToSendTwo.append("Content", file);
    dataToSendTwo.append("SignatureType", 3);
    // Второй запрос с куками и строкой
    console.log("secondData", dataToSendTwo);
    const secondResponse = await axios.post(signaturesUrl, dataToSendTwo);

    console.log("secondResponse", secondResponse);
    // Возвращаем ответ от второго запроса
    return new Response(JSON.stringify(secondResponse.data), {
      status: secondResponse.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("secondResponse", error.response.data);
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.response?.status || 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
