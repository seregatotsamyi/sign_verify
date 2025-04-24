"use client";

import {
  HomeFilled,
  LogoutOutlined,
  SettingFilled,
  SignalFilled,
  SignatureFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Aside({ session }: { session: Session | null }) {
  const currentRoute = usePathname();
  const isActive = (href: string) => {
    if (currentRoute.startsWith(href)) {
      return "_active";
    } else return null;
  };

  const logoutAction = async () => {
    await signOut();
  };

  return (
    <aside className="aside">
      <div className="aside__top">
        <div className="aside__user">
          <Skeleton loading={!!!session} active avatar title={false}>
            <div className="aside__img-wrap">
              <UserOutlined />
            </div>
            <div className="aside__user-info">
              <div className="aside__user-name">{session?.user?.name}</div>
              <div className="aside__user-mail">{session?.user?.email}</div>
            </div>
          </Skeleton>
        </div>

        <nav className="aside__nav">
          <ul className="aside__list">
            <li className="aside__item">
              <Link className={`aside__link ${isActive("/dashboard")}`} href="/dashboard">
                <HomeFilled style={{ fontSize: "20px", marginRight: "20px" }} />
                <span>Главная</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link className={`aside__link ${isActive("/verify")}`} href="/verify">
                <SignatureFilled style={{ fontSize: "20px", marginRight: "20px" }} />
                <span>Проверка</span>
              </Link>
            </li>
            <li className="aside__item">
              <Link className={`aside__link ${isActive("/reports")}`} href="/reports">
                <SignalFilled style={{ fontSize: "20px", marginRight: "20px" }} />
                <span>Отчеты</span>
              </Link>
            </li>
            {session?.user.isAdmin && (
              <>
                <li className="aside__item">
                  <Link className={`aside__link ${isActive("/administration")}`} href="/administration">
                    <SettingFilled style={{ fontSize: "20px", marginRight: "20px" }} />
                    <span>Администрирование</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="aside__exit">
          <button className="aside__link _exit" type="button" onClick={logoutAction}>
            <LogoutOutlined style={{ fontSize: "20px", marginRight: "20px" }} />
            <span>Выйти</span>
          </button>
        </div>
      </div>
      <div className="aside__bottom"></div>
    </aside>
  );
}
