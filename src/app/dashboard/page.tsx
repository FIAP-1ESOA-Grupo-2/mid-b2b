"use client";

import { checkUser, createUser } from "@/server/services/authService";
import { signIn, useSession } from "next-auth/react";

export default () => {
    const user = useSession()

    const handleCreateUser = async () => {
        console.log(await signIn("credentials", { email_or_cpf: "gS0yT@example.com2", password: "123456789", redirect: false }))
    }

    return (
        <>
            STATUS: <mark>{user.status}</mark>
            <br />
            <br />
            <hr />
            <pre>{JSON.stringify(user.data)}</pre>

            <button onClick={handleCreateUser}>Create User</button>
        </>

    )
}