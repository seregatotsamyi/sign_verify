"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import React from "react";

export default function PageRegistr() {
  return (
    <section className="login">
      <div className="login__form-wrap">
        <form className="login__form" action="">
          <div className="login__title _decor">Регистрация</div>
          <div className="login__form-inner">
            <div className="login__row">
              <div className="login__input-wrap input">
                <label className="input__label" htmlFor="name">
                  Имя
                </label>
                <Input id="name" name="name" className="input__input" placeholder="ФИО" />
              </div>
            </div>
            <div className="login__row">
              <div className="login__input-wrap input">
                <label className="input__label" htmlFor="login">
                  Логин (почта)
                </label>
                <Input id="login" name="login" className="input__input" placeholder="email@mail.ru" />
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
            <div className="login__row">
              <div className="login__input-wrap input">
                <label className="input__label" htmlFor="pass-repeat">
                  Повторите пароль
                </label>
                <Input.Password
                  id="pass-repeat"
                  name="pass-repeat"
                  className="input__input"
                  placeholder="пароль"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </div>
            </div>
          </div>
          <div className="login__bottom">
            <Button className="login__btn" type="primary">
              Зарегистрироваться
            </Button>
            <div className="login__text">
              <span>Уже зарегистрированы?</span> <Link href={"/login"}>Авторизоваться</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
