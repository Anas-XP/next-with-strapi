import { usersPermissionsPostAuthLocalRegisterBody } from "@/strapi-endpoints/__generated__/strapi-zod/users-permissions/users-permissions.zod";
import * as z from "zod";

export const zodLoginFormSchema = z.object({
  email: z.email({ error: "Email is invalid!" }),
  password: z.string().min(1, { error: "Password is required!" }),
});

export type TZodLoginFormSchema = z.infer<typeof zodLoginFormSchema>;

export const zodRegisterFormSchema = usersPermissionsPostAuthLocalRegisterBody;

export type TZodRegisterFormSchema = z.infer<typeof zodRegisterFormSchema>;

export const ZEProvider = z.enum(["github", "google"]);

export type TEProvider = z.infer<typeof ZEProvider>;
