"use client";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import React from "react";
import { reportType } from "../../../../../types/common";
import { Pagination, Table } from "antd";
import Link from "next/link";
import { formatter } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface ReportsProps {
  session: Session;
  reports: reportType[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export default function Reports({ session, reports, totalCount, page, pageSize }: ReportsProps) {
  const router = useRouter();
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

  const onChange = async (page: number) => {
    // Обновите URL для перехода на другую страницу
    await router.push(`/reports?page=${page}`);
  };

  return (
    <>
      <TitleBlock session={session} title="Отчеты" />
      <Table className="verify__table" rowKey="id" pagination={false} dataSource={reports} columns={columns} />
      {totalCount > pageSize && (
        <Pagination
          style={{ marginTop: "30px" }}
          align={"end"}
          current={page}
          pageSize={pageSize}
          total={totalCount}
          onChange={onChange}
        />
      )}
    </>
  );
}
