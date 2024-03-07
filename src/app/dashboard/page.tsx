import { authConfig } from "@/config/auth";
import { checkUser, createUser } from "@/server/services/authService";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";

const DashboardPage = async () => {
    const user = await getServerSession(authConfig)

    const handleCreateUser = async () => {
        console.log(await createUser("Teste", "dev@example.com", "123.456.789-10", "Teste", "buyer", "123456", "buyer", "123456789"))
    }

    return (
        <>
            STATUS: <mark>{user?.user ? "Conectado" : "Desconectado"}</mark>
            <br />
            <br />
            <hr />
            <pre>{JSON.stringify(user?.user)}</pre> 
        </>

    )
}

export default DashboardPage