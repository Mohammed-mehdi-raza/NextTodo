"use client";

import { redirect } from 'next/navigation';
import { context } from '../../components/Client';
import React, { useContext } from 'react'

const About = () => {
  const {user}=useContext<any>(context);
  if(!user._id){
    redirect("/login")
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h4>{user.email}</h4>
    </div>
  )
}

export default About;
