"use client";

import { registerUserAction } from "@/app/actions/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import React, { useActionState } from "react";

const INITIAL_STATE = {
  data: null,
};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(registerUserAction, INITIAL_STATE);
  console.log(state);
  return (
    <form className="login__form" action={formAction}>
      <div className="login__title _decor">Регистрация</div>
      <div className="login__form-inner">
        <div className="login__row">
          <div className="login__input-wrap input">
            <label className="input__label" htmlFor="name">
              Имя
            </label>
            <Input id="name" name="name" className="input__input" placeholder="ФИО" />
            {state?.errors?.name && <div className="input__error">{state.errors.name[0]}</div>}
          </div>
        </div>
        <div className="login__row">
          <div className="login__input-wrap input">
            <label className="input__label" htmlFor="login">
              Логин (почта)
            </label>
            <Input id="login" name="login" className="input__input" placeholder="email@mail.ru" />
            {state?.errors?.login && <div className="input__error">{state.errors.login[0]}</div>}
          </div>
        </div>
        <div className="login__row">
          <div className="login__input-wrap input">
            <label className="input__label" htmlFor="password">
              Пароль
            </label>
            <Input.Password
              id="password"
              name="password"
              className="input__input"
              placeholder="пароль"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {state?.errors?.password && <div className="input__error">{state.errors.password[0]}</div>}
          </div>
        </div>
        <div className="login__row">
          <div className="login__input-wrap input">
            <label className="input__label" htmlFor="pass_repeat">
              Повторите пароль
            </label>
            <Input.Password
              id="pass_repeat"
              name="pass_repeat"
              className="input__input"
              placeholder="пароль"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {state?.errors?.pass_repeat && <div className="input__error">{state.errors.pass_repeat[0]}</div>}
          </div>
        </div>
      </div>
      <div className="login__bottom">
        <Button className="login__btn" type="primary" htmlType="submit" disabled={pending}>
          Зарегистрироваться
        </Button>
        <div className="login__text">
          <span>Уже зарегистрированы?</span> <Link href={"/login"}>Авторизоваться</Link>
        </div>
      </div>
    </form>
  );
}
