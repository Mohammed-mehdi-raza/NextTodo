"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { context } from '../../components/Client';
import { redirect } from 'next/navigation';

const Register = () => {
  const [name,setName]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const {user,setUser}=useContext<any>(context)

  const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res = await fetch("api/auth/register",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({
          name,
          email,
          password
        }),
      });
      const data= await res.json();
      if(!data.success){
        return toast.error(data.message);
      }
      setUser(data.user);
      toast.success(data.message);
    } catch (error:any) {
      return toast.error(error)
    }
  }

  if(user?._id){
    redirect("/");
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder='Name' />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder='Email' />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder='Password' />
            <button type="submit">Register</button>
            <p>OR</p>
            <Link href={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  )
}

export const metadata = {
    title: 'Register',
    description: 'This is a Register page of basic todo app',
}

export default Register;
