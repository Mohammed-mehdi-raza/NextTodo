import AddTodoForm from './AddTodoForm';
import Todos from "./Todos";
import { Suspense } from 'react';


const Page = async() => {
  return (
    <div className="container">
      <AddTodoForm/>
      <Suspense fallback={<div>loading...</div>}>
        <Todos/>
      </Suspense>
    </div>
  )
}

export default Page;

