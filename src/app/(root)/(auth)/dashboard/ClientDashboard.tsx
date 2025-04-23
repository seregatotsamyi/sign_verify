"use client";
import InfoBlock from "@/app/components/infoBlock/InfoBlock";
import TitleBlock from "@/app/titleBlock/TitleBlock";
import { Session } from "next-auth";
import React from "react";

export default function ClientDashboard({ session }: { session: Session | null }) {
  return (
    <>
      <TitleBlock session={session} />
      <div className="dashboard">
        <InfoBlock session={session} />
        <div className="block"></div>
      </div>
    </>
  );
}
