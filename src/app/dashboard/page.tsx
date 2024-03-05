"use client";
 
import { createUser } from "@/server/services/authService";
import { useSession } from "next-auth/react";



export default () => {
    const user = useSession()

    const handleCreateUser = () => {
        createUser("Teste", "gS0yT@example.com", "123456789", "sector", "admin", "123456789", "buyer", "11999999999")
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