import { z } from 'zod';

export const userSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(50, 'O nome deve ter no maximo 50 caracteres'),
    cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido'),
    phone_number: z
        .string()
        .max(30, 'O telefone deve ter no maximo 30 caracteres'),
    email: z
        .string()
        .min(1, 'O email é obrigatório')
        .email('Este email é inválido'),
    password: z
        .string()
        .min(8, 'a senha deve ter pelo menos 8 caracteres')
})