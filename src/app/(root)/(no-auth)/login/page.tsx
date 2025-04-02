"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import React, { Suspense } from "react";

export default function PageAuth() {
  return (
    <section className="login">
      <div className="login__form-wrap">
        <form className="login__form" action="">
          <div className="login__title _decor">Авторизация</div>
          <div className="login__form-inner">
            <div className="login__row">
              <div className="login__input-wrap input">
                <Suspense fallback={<p>Loading feed...</p>}>
                  <label className="input__label" htmlFor="login">
                    Логин (почта)
                  </label>
                  <Input id="login" name="login" className="input__input" placeholder="email@mail.ru" />
                </Suspense>
              </div>
            </div>
            <div className="login__row">
              <div className="login__input-wrap input">
                <label className="input__label" htmlFor="pass">
                  Пароль
                </label>
                <Input.Password
                  id="pass"
                  name="pass"
                  className="input__input"
                  placeholder="пароль"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </div>
            </div>
          </div>
          <div className="login__bottom">
            <Button className="login__btn" type="primary">
              Войти
            </Button>
            <div className="login__text">
              <span>Еще не зарегистрированы?</span> <Link href={"/registr"}>Зарегистрироваться</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
