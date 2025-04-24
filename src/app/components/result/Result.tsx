import React from "react";
import { reportApiType } from "../../../../types/common";
import { convertToLocalTime } from "@/utils/functions";

export default function Result({ report, fileName }: { report: reportApiType; fileName: string }) {
  console.log(report);
  return (
    <div className={`verify__complete ${report.Result && "_true"}`}>
      <ul className="verify__list">
        <li className="verify__item">
          <div className="verify__item-title">Основная информация</div>
          <ul className="verify__item-inner">
            <li className="verify__item-item">
              <span>Результат проверки:</span>
              <span className="_text">{report.Result ? "Подпись действительна" : "Подпись недействительна"}</span>
            </li>
            {report.Message && (
              <li className="verify__item-item">
                <span>Сообщение:</span>
                <span>{report.Message}</span>
              </li>
            )}
            <li className="verify__item-item">
              <span>Файл:</span>
              <span>{fileName}</span>
            </li>
          </ul>
        </li>
        <li className="verify__item">
          <div className="verify__item-title">Дополнительная информация о подписи </div>
          <ul className="verify__item-inner">
            {report.SignatureInfo && (
              <li className="verify__item-item">
                <span>Формат подписи:</span>
                <span>{report.SignatureInfo.CAdESType}</span>
              </li>
            )}

            {report?.SignatureInfo?.LocalSigningTime && (
              <li className="verify__item-item">
                <span>Время подписи:</span>
                <span>{convertToLocalTime(report.SignatureInfo.LocalSigningTime)}</span>
              </li>
            )}
          </ul>
        </li>
        <li className="verify__item">
          <div className="verify__item-title">Информация о сертификате</div>
          <ul className="verify__item-inner">
            {report.SignerCertificateInfo && (
              <li className="verify__item-item">
                <span>Субъект:</span>
                <span>{report.SignerCertificateInfo.SubjectName}</span>
              </li>
            )}

            {report.SignerCertificateInfo && (
              <li className="verify__item-item">
                <span>Издатель:</span>
                <span>{report.SignerCertificateInfo.IssuerName}</span>
              </li>
            )}
            {report.SignerCertificateInfo && (
              <li className="verify__item-item">
                <span>Серийный номер:</span>
                <span>{report.SignerCertificateInfo.SerialNumber}</span>
              </li>
            )}
            {report?.SignerCertificateInfo?.NotBefore && report.SignerCertificateInfo.NotAfter && (
              <li className="verify__item-item">
                <span>Срок действия:</span>
                <span>{`${convertToLocalTime(report.SignerCertificateInfo.NotBefore)} - ${convertToLocalTime(
                  report.SignerCertificateInfo.NotAfter
                )}`}</span>
              </li>
            )}
            {report.SignerCertificateInfo && (
              <li className="verify__item-item">
                <span>Отпечаток сертификата:</span>
                <span>{report.SignerCertificateInfo.Thumbprint}</span>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}
