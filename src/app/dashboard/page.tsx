"use client"

import { authConfig } from "@/config/auth";
import { checkUser, createUser } from "@/server/services/authService";
import { getServerSession } from "next-auth";
import { GoogleLogin } from '@react-oauth/google';



const DashboardPage = async () => {
    //const user = await getServerSession(authConfig)


    return (
        <>
            {/*STATUS: <mark>{user?.user ? "Conectado" : "Desconectado"}</mark>*/}
            <br />
            <br />
            <hr />
            {/*<pre>{JSON.stringify(user?.user)}</pre>*/}
            <br />
            <br />
            <hr />

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />;

        </>

    )
}

export default DashboardPage