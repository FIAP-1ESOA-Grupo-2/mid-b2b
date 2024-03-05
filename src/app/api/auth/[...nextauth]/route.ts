import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/types/Auth"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req): Promise<any> {
                if (credentials?.email === 'admin' && credentials?.password === 'admin') {
                    return { email: 'admin', name: 'admin', id: 1, role: 'admin' }
                }
                return {}
            },
        }),
    ],
})

export { handler as GET, handler as POST };