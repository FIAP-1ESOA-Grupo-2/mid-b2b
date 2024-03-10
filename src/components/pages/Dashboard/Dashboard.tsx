"use client"

import { authConfig } from "@/config/auth";
import { checkUser, createUser } from "@/server/services/authService";
import { getServerSession } from "next-auth";
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";


const Dashboard = () => {
    const user = useSession()

    return (
        <>
            STATUS: <mark>{user?.status}</mark>
            <br />
            <br />
            <hr />
            <pre>{JSON.stringify(user?.data?.user)}</pre>
            <br />
            <br />
            <hr />
        </>

    )
}

export default Dashboard