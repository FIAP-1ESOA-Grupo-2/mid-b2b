import type { NextAuthOptions } from "next-auth"

import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                console.log('Invalid credentials');
                return { username: 'dd', password: 'd' };
            },

        }),
    ],
} satisfies NextAuthOptions