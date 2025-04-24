"use client";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React from "react";
import { reportType } from "../../../../../types/common";
import { Table } from "antd";
import Link from "next/link";
import { formatter } from "@/utils/functions";

export default function Reports({ session, reports }: { session: Session | null; reports: Array<reportType> }) {
  const columns = [
    {
      title: "Дата",
      render: (a: reportType) => (
        <Link className="verify__link" href={`http://localhost:3000/reports/${a.id}`}>
          {formatter.format(a.createdAt)}
        </Link>
      ),
    },
    {
      title: "Документ",
      render: (a: reportType) => (
        <Link className="verify__link" href={`http://localhost:3000/reports/${a.id}`}>
          {a.documentName}
        </Link>
      ),
    },
    {
      title: "Статус подписи",
      dataIndex: "result",
      render: (a: boolean) => (
        <>
          {a ? (
            <div style={{ color: "green" }}>Подпись действительна</div>
          ) : (
            <div style={{ color: "red" }}>Подпись не действительна</div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <TitleBlock session={session} title="Отчеты" />
      <Table className="verify__table" rowKey="id" dataSource={reports} columns={columns} />
    </>
  );
}
