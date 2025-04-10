import { auth } from "@/app/auth";
import SigninForm from "@/app/components/forms/SigninForm";
import React from "react";

export default async function PageAuth() {
  const session = await auth();

  // if (!session?.user) {
  //   return redirect("/api/auth/signin");
  // }

  const user = session?.user;

  return (
    <section className="login">
      <div className="login__form-wrap">
        <SigninForm />
      </div>
    </section>
  );
}
