import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../style.scss";
import StoreProvider from "./StoreProvider";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Sign Verify",
  description: "Sign Verify development by Moskalev Sergei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`body`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0485cf",
                borderRadius: 8,
              },
              components: {
                Button: {},
              },
            }}
          >
            <StoreProvider>{children}</StoreProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
