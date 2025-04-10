"use client";

import { Button } from "antd";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/app/auth";

export default function Home() {
  const onRedirect = (url: string) => {
    redirect(url);
  };
  const { data: session } = useSession();
  console.log(session);
  // if (!session?.user) {
  //   return redirect("/api/auth/signin");
  // }

  const logoutAction = async () => {
    await signOut();
  };
  return (
    <section className="home">
      <div className="container">
        <div className="home__inner">
          <div className="home__content">
            <div className="home__top">
              <div className="home__title">Sign Verify - Приложение для проверки электронной подписи</div>
              <div className="home__subtitle _decor">Основные возможности:</div>
              <ul className="home__list">
                <li className="home__item">
                  Проверка подписи: Приложение анализирует электронную подпись, сравнивая ее с оригинальным документом и
                  сертификатом подписи.
                </li>
                <li className="home__item">
                  Поддержка различных форматов: Работает с широким спектром форматов документов (например, PDF, DOCX,
                  XML) и стандартов электронных подписей (например, PKCS#7, XAdES).
                </li>
                <li className="home__item">
                  Проверка сертификатов: Подтверждает валидность сертификата, использованного для подписи документа,
                  проверяя его подлинность и срок действия.
                </li>
                <li className="home__item">
                  Вывод результатов: Предоставляет четкий и понятный отчет о результатах проверки, указывая на наличие
                  или отсутствие подписи, ее действительность и любые выявленные проблемы.
                </li>
                <li className="home__item">
                  Интуитивно понятный интерфейс: Обеспечивает простой и удобный процесс проверки, не требующий
                  специальных знаний в области криптографии.
                </li>
              </ul>
            </div>
            <div className="home__bottom">
              <div className="home__text">Начни пользоваться уже сейчас!</div>
              <div className="home__btns">
                <Button type="primary" onClick={logoutAction}>
                  выйте
                </Button>
                <Button onClick={() => onRedirect("/registr")}>Зарегистрироваться</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
