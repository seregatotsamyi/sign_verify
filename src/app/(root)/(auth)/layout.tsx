"use server";

import { auth } from "@/app/auth";
import Aside from "@/app/components/aside/Aside";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="main">
      <Aside session={session} />
      <div className="main__page">{children}</div>
    </div>
  );
}
