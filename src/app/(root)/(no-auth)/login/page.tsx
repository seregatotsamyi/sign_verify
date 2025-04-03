import SigninForm from "@/app/components/forms/SigninForm";
import React from "react";

export default function PageAuth() {
  return (
    <section className="login">
      <div className="login__form-wrap">
        <SigninForm />
      </div>
    </section>
  );
}
