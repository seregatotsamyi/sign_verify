"use client";

import SignupForm from "@/app/components/forms/SignupForm";
import React from "react";

export default function PageRegistr() {
  return (
    <section className="login">
      <div className="login__form-wrap">
        <SignupForm />
      </div>
    </section>
  );
}
