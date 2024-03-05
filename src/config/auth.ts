import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials): Promise<any> {
                if (credentials?.email === 'admin' && credentials?.password === 'admin') {
                    return { email: 'admin', name: 'admin', id: 1, role: 'admin' }
                }
                return null
            },
        }),
    ],
} satisfies NextAuthOptions