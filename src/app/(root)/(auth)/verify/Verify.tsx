"use client";
import DragAndDrop from "@/app/components/dragAndDrop/DragAndDrop";
import TitleBlock from "@/app/components/titleBlock/TitleBlock";
import { verifyAPI } from "@/lib/apiService/apiService";
import { RcFile } from "antd/es/upload/interface";
import { Session } from "next-auth";
import React from "react";

export default function Verify({ session }: { session: Session | null }) {
  const sendFile = async (file: string, fileInfo: RcFile) => {
    try {
      const response = await fetch(`/api/verify?fileName=${fileInfo.name}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const result = await verifyAPI.getReport({ file, fileType: data.type });

      const verify = await fetch(`/api/verify`, {
        method: "POST",
        body: JSON.stringify({ information: result.data[0], docName: fileInfo.name }),
      });

      if (!verify.ok) {
        const errorBody = await verify.json();
        throw new Error(errorBody.error || `HTTP error! status: ${verify.status}`);
      }

      console.log(verify);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TitleBlock session={session} title="Проверка подписи" />
      <div className="verify ">
        <div className="verify__descr block">
          <p>
            Данное приложение предоставляет пользователям возможность проверять подлинность электронных подписей на
            различных документах. Система поддерживает множество форматов электронных документов и различных типов
            подписей, включая:
          </p>
          <ul>
            <li>
              Открепленная (отсоединенная) электронная подпись: Подпись, которая хранится отдельно от документа и может
              быть проверена с использованием соответствующего сертификата. Часто у нее такое же название, как у
              исходного файла, но другое расширение — «.sig», «.sgn» или «.p7s».
            </li>
            <li>
              Встроенная электронная подпись: Подпись, которая является частью структуры документа и проверяется в
              процессе его открытия. Встроенную ЭП можно поставить только через специальные программы, например,
              КриптоПро Office Signature или КриптоПро PDF.
            </li>
          </ul>
        </div>
      </div>
      <DragAndDrop type="sign" sendFile={sendFile} />
    </>
  );
}
