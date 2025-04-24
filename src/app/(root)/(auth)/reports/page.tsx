import React from "react";
import Reports from "./Reports";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma";
import { reportType } from "../../../../../types/common";

export default async function page() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }
  let reports: reportType[] = [];
  try {
    reports = await prisma.verificationResult.findMany({
      where: {
        userId: session?.user.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (e) {
    console.error(e);
  }

  return <Reports session={session} reports={reports} />;
}
