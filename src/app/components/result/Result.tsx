import React from "react";
import { reportApiType } from "../../../../types/common";
import { format } from "date-fns";

function convertToLocalTime(dateString: string) {
  try {
    // 1. Извлекаем компоненты даты и времени и часовой пояс:
    const parts = dateString.match(/(\d{2}):(\d{2})\s(\d{2})\.(\d{2})\.(\d{4})\s\(UTC\s([+-]\d{2}:\d{2})\)/);

    if (!parts) {
      throw new Error("Invalid date format");
    }

    const [, hours, minutes, day, month, year] = parts;

    // 2. Создаем Date объект в UTC:
    //@ts-ignore
    const dateUTC = new Date(Date.UTC(year, month - 1, day, hours, minutes));

    // 3. Форматируем с учетом местного времени:
    const formatter = new Intl.DateTimeFormat(undefined, {
      // Используем локаль браузера по умолчанию
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Используем 24-часовой формат
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Явно получаем таймзону браузера
    });

    const formattedDate = formatter.format(dateUTC).replace(/(\d+)\/(\d+)\/(\d+),?/, "$3.$1.$2");

    return formattedDate;
  } catch (error) {
    console.error("Error converting date:", error);
    return null;
  }
}

export default function Result({ report, fileName }: { report: reportApiType; fileName: string }) {
  return (
    <div className={`verify__complete ${report.Result && "_true"}`}>
      <ul className="verify__list">
        <li className="verify__item">
          <div className="verify__item-title">Основная информация</div>
          <ul className="verify__item-inner">
            <li className="verify__item-item">
              <span>Результат проверки:</span>
              <span className="_text">{report.Result ? "Подпись действительна" : "Подпись недействительно"}</span>
            </li>
            <li className="verify__item-item">
              <span>Файл:</span>
              <span>{fileName}</span>
            </li>
          </ul>
        </li>
        <li className="verify__item">
          <div className="verify__item-title">Дополнительная информация о подписи </div>
          <ul className="verify__item-inner">
            <li className="verify__item-item">
              <span>Формат подписи:</span>
              <span>{report.SignatureInfo.CAdESType}</span>
            </li>
            <li className="verify__item-item">
              <span>Время подписи:</span>
              <span>{convertToLocalTime(report.SignatureInfo.LocalSigningTime)}</span>
            </li>
          </ul>
        </li>
        <li className="verify__item">
          <div className="verify__item-title">Информация о сертификате</div>
          <ul className="verify__item-inner">
            <li className="verify__item-item">
              <span>Субъект:</span>
              <span>{report.SignerCertificateInfo.SubjectName}</span>
            </li>
            <li className="verify__item-item">
              <span>Издатель:</span>
              <span>{report.SignerCertificateInfo.IssuerName}</span>
            </li>
            <li className="verify__item-item">
              <span>Серийный номер:</span>
              <span>{report.SignerCertificateInfo.SerialNumber}</span>
            </li>
            <li className="verify__item-item">
              <span>Срок действия:</span>
              <span>{`${convertToLocalTime(report.SignerCertificateInfo.NotBefore)} - ${convertToLocalTime(
                report.SignerCertificateInfo.NotAfter
              )}`}</span>
            </li>
            <li className="verify__item-item">
              <span>Отпечаток сертификата:</span>
              <span>{report.SignerCertificateInfo.Thumbprint}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
