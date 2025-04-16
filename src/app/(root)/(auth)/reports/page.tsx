import React from "react";
import Reports from "./Reports";
import { auth } from "@/app/auth";

export default async function page() {
  const session = await auth();

  return <Reports session={session} />;
}
