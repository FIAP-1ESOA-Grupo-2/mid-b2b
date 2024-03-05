"use client";
 
import { useSession } from "next-auth/react";



export default () => {
    const user = useSession()

    return (
        <>
            STATUS: <mark>{user.status}</mark>
            <br />
            <br />
            <hr />
            <pre>{JSON.stringify(user.data)}</pre>
        </>

    )
}