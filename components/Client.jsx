"use client";

import Link from "next/link";
import { useState,createContext,useContext, useEffect } from "react";
import { Toaster,toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const context = createContext({user:{}});
export const ContextProvider=({children})=>{
    const [user,setUser]=useState({});

    useEffect(()=>{
        fetch("/api/auth/me").then((res)=>res.json()).then(data=>{
            if(data.success){
                setUser(data.user);
            }
        })
    },[])

    return (
        <context.Provider value={{user,setUser}}>
            {children}
            <Toaster/>
        </context.Provider>
    )
} 

export const LogoutBtn=()=>{

    const {user,setUser} =useContext(context);

    const logoutHandeler=async()=>{
        try {
            const res=await fetch("/api/auth/logout");
            const data=await res.json();
            if(!data.success){
                return toast.error(data.message);
            }
            setUser({});
            toast.success(data.message);
        } catch (error) {
            return toast.error(error)
        }

    }

    return( user?._id ?
        <button onClick={logoutHandeler} className="btn">Logout</button>
        : <Link href={"/login"}>Login</Link>
    )
}

export const TodoButton=({completed,id})=>{

    const router=useRouter();
    const deleteHandeler=async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`,{
                method:"DELETE",
            });
            const data = await res.json();
            if(!data.success){
                return toast.error(data.message);
            }
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    }

    const updateHandeler=async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`,{
                method:"PUT",
            });
            const data = await res.json();
            if(!data.success){
                return toast.error(data.message);
            }
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    }

    return(
        <>
            <input type="checkbox" onChange={()=>updateHandeler(id)} checked={completed}/>
            <button className="btn" onClick={()=>deleteHandeler(id)}>Delete</button>
        </>
    )
}