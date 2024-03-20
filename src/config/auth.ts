import { checkUser } from "@/server/authService"
import { User, UserSession } from "@/types/Auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                email_or_cpf: { label: 'Username' },
                password: { label: 'Password' }
            },
            async authorize(credentials, req: any): Promise<any> {
                if (!credentials) return null

                if (req.body.user) return JSON.parse(req.body.user)

                const user = await checkUser(credentials.email_or_cpf, credentials.password)

                return user ?? null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user

            return token
        },
        async session({ session, token }) {
            if (token.user) session.user = token.user as UserSession

            return session
        }
    }
} satisfies NextAuthOptions