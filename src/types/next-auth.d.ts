import NextAuth from "next-auth"
import { User } from "./Auth"

declare module "next-auth" {
    interface Session {
        user: User
    }
}