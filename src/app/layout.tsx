import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";
import { Montserrat } from "next/font/google";
import "../style.scss";
import StoreProvider from "./StoreProvider";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./NotificationProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Sign Verify",
  description: "Sign Verify development by Moskalev Sergei",
};

export default async function RootLayout({ children, Session }: { children: React.ReactNode; Session: any }) {
  return (
    <html lang="ru" className={montserrat.className}>
      <body className={`body`}>
        <SessionProvider session={Session}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#0485cf",
                  borderRadius: 8,
                  fontFamily: "Montserrat",
                },
                components: {
                  Button: {},
                },
              }}
            >
              <NotificationProvider>
                <StoreProvider>{children}</StoreProvider>
              </NotificationProvider>
            </ConfigProvider>
          </AntdRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
