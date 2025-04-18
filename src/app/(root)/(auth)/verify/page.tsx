import React, { Suspense } from "react";
import Verify from "./Verify";
import { auth } from "@/app/auth";
import Loading from "@/app/components/loading/Loading";

export default async function page() {
  const session = await auth();

  return (
    <Suspense fallback={<Loading />}>
      <Verify session={session} />
    </Suspense>
  );
}
