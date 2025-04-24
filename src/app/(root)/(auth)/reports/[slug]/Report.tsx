"use client";
import React, { useEffect, useState } from "react";
import { reportApiType, reportType } from "../../../../../../types/common";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import { Button } from "antd";
import Result from "@/app/components/result/Result";
import { useRouter } from "next/navigation";
import { formatter } from "@/utils/functions";

export default function Report({ report, session }: { report: reportType | null; session: Session | null }) {
  const [reportApi, setReportApi] = useState<null | reportApiType>(null);
  const router = useRouter();

  useEffect(() => {
    if (report) {
      setReportApi({
        Result: report.result,
        ...(report.Message && { Message: report.Message }),
        ...(report.signatureType &&
          report.signatureTime && {
            SignatureInfo: { CAdESType: report.signatureType, LocalSigningTime: report.signatureTime },
          }),
        ...(report.issuerName && {
          SignerCertificateInfo: {
            IssuerName: report.issuerName,
            NotAfter: report.notAfter,
            NotBefore: report.notBefore,
            SerialNumber: report.scopeSerialNumber,
            SubjectName: report.subjectName,
            Thumbprint: report.thumbprint,
          },
        }),
      });
    }
  }, [report]);

  return (
    <>
      <TitleBlock session={session} title="Отчет" />
      <div className="verify ">
        <div className="verify__descr block">
          <p>Ознакомьтесь с отчетом от {formatter.format(report?.updatedAt)}</p>
        </div>
        {report && reportApi ? (
          <>
            <Result fileName={report.documentName} report={reportApi} />
          </>
        ) : (
          <div>Ошибка</div>
        )}
        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          onClick={() => {
            router.back();
          }}
        >
          Вернуться назад
        </Button>
      </div>
    </>
  );
}
