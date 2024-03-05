 
import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth/next" 
import { signIn } from "next-auth/react";

export default async function Page() {
    const session = await getServerSession(authConfig)

     signIn('credentials', { email: 'teste', password: 'teste' });

    return (
        <>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
 
        </>

    )
}