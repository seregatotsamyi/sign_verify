import React from "react";
import ClientDashboard from "./ClientDashboard";
import { auth } from "../../../auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      <ClientDashboard session={session} />
    </>
  );
}
