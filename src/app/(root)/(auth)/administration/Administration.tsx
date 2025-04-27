"use client";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React from "react";
import { usersType } from "../../../../../types/common";
import { Pagination, Table } from "antd";
import Link from "next/link";
import { formatter } from "@/utils/functions";
import { useRouter } from "next/navigation";

interface AdministrationProps {
  session: Session;
  users: usersType[] | undefined;
  totalCount: number;
  page: number;
  pageSize: number;
}

export default function Administration({ session, users, totalCount, page, pageSize }: AdministrationProps) {
  const router = useRouter();
  const columns = [
    {
      title: "Имя пользователя",
      render: (a: usersType) => (
        <Link className="verify__link" href={`http://localhost:3000/administration/${a.id}`}>
          {a.name}
        </Link>
      ),
    },
    {
      title: "Почта",
      render: (a: usersType) => (
        <Link className="verify__link" href={`http://localhost:3000/administration/${a.id}`}>
          {a.email}
        </Link>
      ),
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      render: (a: Date) => <>{formatter.format(a)}</>,
    },
  ];

  const onChange = async (page: number) => {
    // Обновите URL для перехода на другую страницу
    await router.push(`/administration?page=${page}`);
  };

  return (
    <>
      <TitleBlock session={session} title="Администрирование" />
      <div className="verify__descr block">
        <p>
          Управление пользователями включает: изменение имени, почты, просмотра статистики запросов, блокировка
          аккаунта.
        </p>
      </div>
      <Table className="verify__table" pagination={false} rowKey="id" dataSource={users} columns={columns} />
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
