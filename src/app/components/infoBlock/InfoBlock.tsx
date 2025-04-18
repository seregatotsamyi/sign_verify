import { Skeleton } from "antd";
import { Session } from "next-auth";
import React from "react";

export default function InfoBlock({ session }: { session: Session | null }) {
  return (
    <div className="infoBlock block">
      <div className="infoBlock__top">Информация о вас</div>
      <Skeleton loading={!!!session} title={false} active paragraph={{ rows: 3 }}>
        <ul className="infoBlock__list">
          <li className="infoBlock__item">
            <span>Имя: </span>
            <span>{session?.user.name}</span>
          </li>
          <li className="infoBlock__item">
            <span>Почта: </span>
            <span>{session?.user.email}</span>
          </li>
          <li className="infoBlock__item">
            <span>Тип аккаунта: </span>
            <span>{session?.isAdmin ? "Администратор" : "Пользователь"}</span>
          </li>
        </ul>
      </Skeleton>
    </div>
  );
}
