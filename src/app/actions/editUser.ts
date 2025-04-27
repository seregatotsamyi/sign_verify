import { EditUserFormSchema } from "@/lib/definitions";

export async function editUserAction(state: any, formData: FormData) {
  const validatedFields = EditUserFormSchema.safeParse({
    login: formData.get("login"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    ...state,
    errors: null,
    login: validatedFields.data.login,
    name: validatedFields.data.name,
  };
}
