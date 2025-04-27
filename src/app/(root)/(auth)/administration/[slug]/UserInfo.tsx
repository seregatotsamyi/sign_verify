"use client";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfoBlock from "@/app/components/infoBlock/InfoBlock";
import { usersType } from "../../../../../../types/common";
import { Button, Input } from "antd";
import Statistics from "@/app/components/statisticsBlock/StatisticsBlock";
import { useNotificationContext } from "@/app/NotificationProvider";
import { editUserAction } from "@/app/actions/editUser";
import { showNotification } from "@/lib/notification";
import { userAPI } from "@/lib/apiService/apiService";

interface UserInfoProps {
  session: Session;
  user: usersType;
}

type formStateType = {
  name: string;
  login: string;
};
export default function UserInfo({ session, user }: UserInfoProps) {
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: user.name || "",
    login: user.email || "",
  });

  const [state, formAction, pending] = useActionState(editUserAction, formState);
  const { apiNotification } = useNotificationContext();

  const onEdit = async (state: formStateType) => {
    try {
      await userAPI.editUser({ id: user.id, login: state.login, name: state.name });
      showNotification(apiNotification, "success", "Успешное изменение данных");
      router.refresh();
    } catch (err) {
      showNotification(apiNotification, "error", "Ошибка запроса");
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onBlock = async () => {
    try {
      await userAPI.blockUser({ id: user.id, block: !user.isBlock });
      showNotification(apiNotification, "success", "Смена статуса пользователя");
      router.refresh();
    } catch (err) {
      showNotification(apiNotification, "error", "Ошибка смены статуса пользователя");
      console.error(err);
    }
  };

  useEffect(() => {
    if (state?.errors === null) {
      onEdit(state);
    }
  }, [state]);

  return (
    <>
      <TitleBlock session={session} title="Информация о пользователе" />
      <Button
        type="primary"
        style={{ marginBottom: "20px" }}
        onClick={() => {
          router.back();
        }}
      >
        Вернуться назад
      </Button>
      <div className="dashboard">
        <InfoBlock user={user} />
        <Statistics id={user.id} />
      </div>
      <div className="edit">
        <div className="edit__left">
          <div className="edit__top">Управление пользователем</div>
          <form className="edit__form" action={formAction}>
            <div className="login__form-inner">
              <div className="login__row">
                <div className="login__input-wrap input">
                  <label className="input__label" htmlFor="login">
                    Логин (почта)
                  </label>
                  <Input value={formState.login} name="login" id="login" onChange={handleInputChange} />
                  {state?.errors?.login && <div className="input__error">{state.errors.login[0]}</div>}
                </div>
              </div>
              <div className="login__row">
                <div className="login__input-wrap input">
                  <label className="input__label" htmlFor="name">
                    Имя
                  </label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    name="name"
                    className="input__input"
                    placeholder="Имя"
                  />
                  {state?.errors?.name && <div className="input__error">{state.errors.name[0]}</div>}
                </div>
              </div>
            </div>
            <div className="login__bottom">
              <Button className="login__btn" type="primary" htmlType="submit" disabled={pending}>
                Изменить
              </Button>
            </div>
          </form>
        </div>
        {!user.isAdmin && (
          <div className="edit__right">
            {user.isBlock ? (
              <Button onClick={onBlock} type="primary">
                Разблокировать
              </Button>
            ) : (
              <Button onClick={onBlock} type="primary" danger>
                Заблокировать
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
