"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

interface NotificationContextType {
  apiNotification: NotificationInstance;
  contextHolder: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification(); // Corrected initialization

  const value: NotificationContextType = {
    apiNotification: api,
    contextHolder,
  };

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
