import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";
import { Inter, Montserrat } from "next/font/google";
import "../style.scss";
import StoreProvider from "./StoreProvider";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import { NotificationProvider } from "./NotificationProvider";
import { auth } from "./auth";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Sign Verify",
  description: "Sign Verify development by Moskalev Sergei",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="ru" className={`${montserrat.className} ${inter.className}`}>
      <body className={`body`}>
        <SessionProvider session={session}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#2d45c6",
                  borderRadius: 8,
                  fontFamily: "Inter",
                },

                components: {
                  Skeleton: {
                    titleHeight: 54,
                  },
                  Table: {
                    headerBg: "#2d45c6",
                    headerColor: "#fff",
                    borderColor: "#dcdcdc",
                  },
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
