"use server";
import React from "react";
import Report from "./Report";
import { auth } from "@/app/auth";
import { prisma } from "../../../../../../prisma/prisma";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const report = await prisma.verificationResult.findUnique({
    where: {
      id: slug,
      userId: session?.user.userId,
    },
  });

  return <Report report={report} session={session} />;
}
