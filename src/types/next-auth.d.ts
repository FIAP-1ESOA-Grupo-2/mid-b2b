import NextAuth from "next-auth"
import { UserSession } from "./Auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: UserSession
    }
} 