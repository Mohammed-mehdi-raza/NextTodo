import { TodoItem } from '../components/Server';
import React from 'react';
import { cookies } from 'next/headers';

const FetchTodo=async(token:any)=>{
  try {
    const res = await fetch(`${process.env.URL}/api/fetchAllTasks`,{
      cache:'no-cache',
      headers:{
        cookie:`token=${token}`
      }
    });
    const data =await res.json();
    if(!data.success){
      return [];
    }
    return data.tasks;
  } catch (error) {
    return [];
  }
}

const Todos:any = async() => {

  const token= cookies().get("token")?.value;

  const tasks = await FetchTodo(token);

  return (
    <section className="todosContainer">
        {
            tasks?.map((i:any)=>(
            <TodoItem key={i._id} title={i.title} description={i.description} id={i._id} completed={i.isCompleted}/>
            ))
        }
    </section>
  )
}

export default Todos;
