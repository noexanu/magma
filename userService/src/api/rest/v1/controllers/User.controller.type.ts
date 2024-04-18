import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export const userRequestBodySchema = z.object({ body: userSchema });
export const userRequestBodyPartialSchema = z.object({ body: userSchema.partial() });
export const userRequestParamsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const userReadSchema = userRequestParamsSchema;
export const userCreateSchema = userRequestBodySchema;
export const userUpdateSchema = userRequestParamsSchema.merge(userRequestBodyPartialSchema);
export const userDeleteSchema = userRequestParamsSchema;

export type UserDTO = z.infer<typeof userSchema>;
export type UserReadReq = z.infer<typeof userReadSchema>;
export type UserCreateReq = z.infer<typeof userCreateSchema>;
export type UserUpdateReq = z.infer<typeof userUpdateSchema>;
export type UserDeleteReq = z.infer<typeof userDeleteSchema>;
