"use client";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React from "react";
import { reportType } from "../../../../../types/common";
import { Table } from "antd";

const formatter = new Intl.DateTimeFormat("ru-RU", {
  // Используем русскую локаль
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function Reports({ session, reports }: { session: Session | null; reports: Array<reportType> }) {
  console.log(reports);

  const columns = [
    {
      title: "Дата",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (a: string) => <>{formatter.format(a)}</>,
    },
    {
      title: "Документ",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "Статус подписи",
      dataIndex: "result",
      key: "result",
      render: (a: boolean) => <>{a ? "Подпись действительна" : "Подпись не действительна"}</>,
    },
  ];

  return (
    <>
      <TitleBlock session={session} title="Отчеты" />
      <Table dataSource={reports} columns={columns} />
    </>
  );
}
