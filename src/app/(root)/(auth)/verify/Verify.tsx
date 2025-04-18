"use client";
import DragAndDrop from "@/app/components/dragAndDrop/DragAndDrop";
import TitleBlock from "@/app/components/titleBlock/TitleBlock";
import { verifyAPI } from "@/lib/apiService/apiService";
import { UploadFile } from "antd";
import { Session } from "next-auth";
import React from "react";

export default function Verify({ session }: { session: Session | null }) {
  const sendFile = async (file: any) => {
    try {
      //const { data } = await verifyAPI.uploadDoc({ file });

      const { data: report } = await verifyAPI.getReport({ file });
      console.log(report);
      const formData = new FormData();
      //@ts-ignore
      // formData.append("file", file);
      // const response = await fetch("/api/proxi", {
      //   method: "POST",
      //   body: formData,
      // });
      const result = await response.json();
    } catch (e: any) {
      console.error(e);
    } finally {
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
