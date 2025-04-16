import React from "react";
import Verify from "./Verify";
import { auth } from "@/app/auth";

export default async function page() {
  const session = await auth();

  return <Verify session={session} />;
}
