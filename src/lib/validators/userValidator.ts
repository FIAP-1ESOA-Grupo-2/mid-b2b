import { z } from 'zod';

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(50, 'O nome deve ter no maximo 50 caracteres'),
    cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido'),
    phone_number: z
        .string()
        .max(15, 'O telefone deve ter no maximo 15 caracteres'),
    email: z
        .string()
        .min(1, 'O email é obrigatório')
        .email('Este email é inválido'),
    sector: z
        .string()
        .max(70, 'O setor deve ter no maximo 70 caracteres'),
    role: z
        .string()
        .max(70, 'O cargo deve ter no maximo 70 caracteres'),
    password: z
        .string()
        .min(1, 'A senha é obrigatória')
        .max(70, 'A senha deve ter no maximo 70 caracteres'),
})


export const signInSchema = z.object({
    email_or_cpf: z.union([
        z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Email ou CPF é obrigatório'),
        z.string().email('Email inválido')
    ]),
    password: z
        .string()
        .min(1, 'A senha é obrigatória')
})


export const forgotPasswordSchema = z.object({
    email_or_cpf: z.union([
        z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Email ou CPF é obrigatório'),
        z.string().email('Email inválido')
    ]),
})

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório')
        .max(50, 'O nome deve ter no maximo 50 caracteres'),
    cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido'),
    phone_number: z
        .string()
        .max(15, 'O telefone deve ter no maximo 15 caracteres'),
    sector: z
        .string()
        .max(70, 'O setor deve ter no maximo 70 caracteres'),
    role: z
        .string()
        .max(70, 'O cargo deve ter no maximo 70 caracteres'),
    new_password: z
        .string()
        .max(70, 'A senha deve ter no maximo 70 caracteres'),
})