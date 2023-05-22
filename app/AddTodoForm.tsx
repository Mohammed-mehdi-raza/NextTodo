"use client";

import React, { useState , useContext} from 'react';
import { toast } from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import { context } from '../components/Client';
import { redirect } from 'next/navigation';

const AddTodoForm = () => {

  const [title,setTitle]=useState<string>("");
  const[description,setDescription]=useState<string>("");
  const router= useRouter();
  const {user} = useContext<any>(context);

  const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res=await fetch("/api/newTask",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({
          title,
          description,
        })
      });
      const data=await res.json();
      if(!data.success){
        return toast.error(data.message);
      }
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error:any) {
      return toast.error(error);
    }
  }

  if(!user?._id){
    redirect("/login");
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder='Todo Title' />
          <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" name="description" placeholder='Todo Description' />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  )
}

export default AddTodoForm;
