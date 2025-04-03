"use client";

import { signupUserAction } from "@/app/actions/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import React, { useActionState } from "react";

const INITIAL_STATE = {
  data: null,
};

export default function SigninForm() {
  const [state, formAction, pending] = useActionState(signupUserAction, INITIAL_STATE);

  return (
    <form className="login__form" action={formAction}>
      <div className="login__title _decor">Авторизация</div>
      <div className="login__form-inner">
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
      </div>
      <div className="login__bottom">
        <Button className="login__btn" type="primary" htmlType="submit" disabled={pending}>
          Войти
        </Button>
        <div className="login__text">
          <span>Еще не зарегистрированы?</span> <Link href={"/registr"}>Зарегистрироваться</Link>
        </div>
      </div>
    </form>
  );
}
