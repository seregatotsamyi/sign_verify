import { auth } from "@/app/auth";
import Administration from "./Administration";
import { prisma } from "../../../../../prisma/prisma";
import { usersType } from "../../../../../types/common";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const session = await auth();
  const searchParamsComplete = await searchParams;
  if (!session) {
    return redirect("/");
  }

  const page = parseInt(searchParamsComplete.page) || 1;
  const pageSize = 10;
  let totalCount = 0;
  let users: usersType[] | undefined = undefined;

  try {
    totalCount = await prisma.user.count();
    users = await prisma.user.findMany({
      omit: {
        password: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  } catch (e) {
    console.error(e);
  }

  return <Administration session={session} users={users} page={page} pageSize={pageSize} totalCount={totalCount} />;
}
