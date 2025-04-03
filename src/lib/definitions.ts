import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Минимум 3 символа",
      })
      .max(30, {
        message: "Максимум 30 символов",
      })
      .regex(/[a-zA-Zа-яА-ЯёЁ ]/g, { message: "Допускаются только буквы" }),
    login: z.string().email({ message: "Пожалуйста введите валидный email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Минимум 8 символов" })
      .regex(/[a-zA-Z]/, { message: "Минимум один заглавный и строчный символ" })
      .regex(/[0-9]/, { message: "Пароль должен содержать число." })
      .trim(),
    pass_repeat: z
      .string()
      .min(8, { message: "Минимум 8 символов" })
      .regex(/[a-zA-Z]/, { message: "Минимум один заглавный и строчный символ" })
      .regex(/[0-9]/, { message: "Пароль должен содержать число." })
      .trim(),
  })
  .superRefine(({ pass_repeat, password }, ctx) => {
    if (pass_repeat !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Пароли не совпадают",
        path: ["pass_repeat"],
      });
    }
  });

export const SigninFormSchema = z.object({
  login: z.string().email({ message: "Пожалуйста введите валидный email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Минимум 8 символов" })
    .regex(/[a-zA-Z]/, { message: "Минимум один заглавный и строчный символ" })
    .regex(/[0-9]/, { message: "Пароль должен содержать число." })
    .trim(),
});
