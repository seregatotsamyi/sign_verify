"use client";
import TitleBlock from "@/app/components/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React from "react";

export default function Reports({ session }: { session: Session | null }) {
  return (
    <>
      <TitleBlock session={session} title="Отчеты" />
    </>
  );
}
