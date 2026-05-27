"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';
function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){

    const { user, isLoaded } = useUser();
    const [userDetail, setUserDetail] = useState<any>();

    useEffect(() => {
        console.log("isLoaded:", isLoaded, "user:", user);
        if (isLoaded && user) {
            CreateNewUser();
        }
    }, [isLoaded, user])

    const CreateNewUser = async () => {
        try {
            const result = await axios.post('/api/users', {});
            console.log("Result", result);
            setUserDetail(result.data?.user);
        } catch (error) {
            console.log("Error creating user:", error);
        }
    }

    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
   
    )
}

export default Provider