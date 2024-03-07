import { checkUser } from "@/server/services/authService"
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
            async authorize(credentials): Promise<any> {
                if (!credentials) return null

                const user = await checkUser(credentials.email_or_cpf, credentials.password)

                return user ?? null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, }) {
            if (user) token.user = user

            return token
        },
        async session({ session, token, user }) {
            if (token.user) session.user = token.user as UserSession

            return session
        }


    }
} satisfies NextAuthOptions