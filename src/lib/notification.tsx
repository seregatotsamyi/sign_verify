import { NotificationInstance } from "antd/es/notification/interface";

type typeNotification = "success" | "error" | "info" | "warning";

const titleForNotification = (type: typeNotification) => {
  switch (type) {
    case "error": {
      return "Ошибка";
    }
    case "success": {
      return "Успешно";
    }
    case "info": {
      return "Уведомление";
    }
    case "warning": {
      return "Внимание";
    }
  }
};

export const showNotification = (api: NotificationInstance, type: typeNotification, message: string) => {
  api[type]({
    message: titleForNotification(type),
    description: message,
  });
};
