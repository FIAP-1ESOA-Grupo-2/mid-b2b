import NextAuth from "next-auth"
import { authConfig } from "@/config/auth"

export const handler = NextAuth(authConfig) 