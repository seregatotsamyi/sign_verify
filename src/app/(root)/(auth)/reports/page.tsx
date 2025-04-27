import React from "react";
import Reports from "./Reports";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma";
import { reportType } from "../../../../../types/common";

export default async function page({ searchParams }: { searchParams: { page: string } }) {
  const session = await auth();
  const searchParamsComplete = await searchParams;

  if (!session) {
    return redirect("/");
  }

  const page = parseInt(searchParamsComplete.page) || 1;
  const pageSize = 10;
  let totalCount = 0;
  let reports: reportType[] = [];

  try {
    totalCount = await prisma.verificationResult.count({
      where: {
        userId: session?.user.userId,
      },
    });
    reports = await prisma.verificationResult.findMany({
      where: {
        userId: session?.user.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  } catch (e) {
    console.error(e);
  }

  return <Reports session={session} reports={reports} totalCount={totalCount} page={page} pageSize={pageSize} />;
}
