"use server";

import { SigninFormSchema, SignupFormSchema } from "@/lib/definitions";

export async function signupUserAction(state: any, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    login: formData.get("login"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return {
    ...state,
    errors: null,
    data: "ok",
  };
}

export async function registerUserAction(state: any, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    login: formData.get("login"),
    password: formData.get("password"),
    pass_repeat: formData.get("pass_repeat"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    ...state,
    errors: null,
    data: "ok",
  };
}
