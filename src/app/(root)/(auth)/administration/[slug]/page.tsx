import { auth } from "@/app/auth";
import { prisma } from "../../../../../../prisma/prisma";
import { redirect } from "next/navigation";
import UserInfo from "./UserInfo";

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: {
      id: slug,
    },
  });

  if (!user) {
    console.error("Пользователь не найден");
    return redirect("/");
  }
  return <UserInfo session={session} user={user} />;
}
