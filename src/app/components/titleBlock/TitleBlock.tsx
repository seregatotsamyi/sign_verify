import { Skeleton } from "antd";
import { Session } from "next-auth";
import React from "react";

export default function TitleBlock({ title, session }: { title?: string; session: Session | null }) {
  return (
    <div className="titleBlock">
      <Skeleton active loading={!!!session} paragraph={false} title={{ width: "50%" }}>
        <div className="titleBlock__title title _decor">{title ? title : `Привет, ${session?.user?.name}!`}</div>
      </Skeleton>
    </div>
  );
}
