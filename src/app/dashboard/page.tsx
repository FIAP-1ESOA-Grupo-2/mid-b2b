"use client";

import { checkUser, createUser } from "@/server/services/authService";
import { useSession } from "next-auth/react";



export default () => {
    const user = useSession()

    const handleCreateUser = async () => {
        console.log(await checkUser("123456789", "123456789"))
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