import { Skeleton } from "antd";
import { Session } from "next-auth";
import React from "react";
import { usersType } from "../../../../types/common";

export default function InfoBlock({ session, user }: { session?: Session | null; user?: usersType }) {
  return (
    <div className="infoBlock block">
      <div className="infoBlock__top">Информация о {session ? "вас" : "пользователе"}</div>
      {user ? (
        <ul className="infoBlock__list">
          <li className="infoBlock__item">
            <span>Имя: </span>
            <span>{user?.name}</span>
          </li>
          <li className="infoBlock__item">
            <span>Почта: </span>
            <span>{user.email}</span>
          </li>
          <li className="infoBlock__item">
            <span>Тип аккаунта: </span>
            <span>{user.isAdmin ? "Администратор" : "Пользователь"}</span>
          </li>
        </ul>
      ) : (
        <Skeleton loading={!!!session} title={false} active paragraph={{ rows: 3 }}>
          <ul className="infoBlock__list">
            <li className="infoBlock__item">
              <span>Имя: </span>
              <span>{session?.user?.name}</span>
            </li>
            <li className="infoBlock__item">
              <span>Почта: </span>
              <span>{session?.user.email}</span>
            </li>
            <li className="infoBlock__item">
              <span>Тип аккаунта: </span>
              <span>{session?.user.isAdmin ? "Администратор" : "Пользователь"}</span>
            </li>
          </ul>
        </Skeleton>
      )}
    </div>
  );
}
