"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { context } from '../../components/Client';
import {toast} from "react-hot-toast";
import { redirect } from 'next/navigation';

const Login = () => {

  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");

  const {user,setUser}=useContext<any>(context);

  const loginHandeler=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const res = await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify({
          email,
          password
        }),
        headers:{
          "Content-type":"application/json",
        },
      });
      const data= await res.json();
      if(!data.success){
        return toast.error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);

    }catch(err:any){
      return toast.error(err);
    }
  };

  if(user?._id){
    redirect("/");
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandeler}>
          <input type="email" name="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" name="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit">Login</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'Login',
  description: 'This is a Login page of basic todo app',
}

export default Login;
