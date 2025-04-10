"use server";

const prisma = new PrismaClient();

import { SigninFormSchema, SignupFormSchema } from "@/lib/definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function signInUserAction(state: any, formData: FormData) {
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
    data: {
      login: validatedFields.data.login,
      password: validatedFields.data.password,
    },
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

  try {
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    await prisma.user.create({
      data: {
        email: validatedFields.data.login,
        password: hashedPassword,
        name: validatedFields.data.name,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      errorsType: 1,
      errors: "Ошибка регистрации пользователя",
    };
  }

  return {
    ...state,
    errors: null,
    data: "ok",
  };
}
