import { checkUser } from "@/server/services/authService"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                email_or_cpf: { label: 'Username' },
                password: { label: 'Password' }
            },
            async authorize(credentials): Promise<any> {
                if (!credentials) return null

                const user = await checkUser(credentials.email_or_cpf, credentials.password)

                return user ?? null
            },
        }),
    ],
} satisfies NextAuthOptions