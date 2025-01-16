import React from 'react'
import { useState } from 'react'
import "../style.css";

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');


  const handleSubmit = ()=>{
    if(newTodo.trim()==='') return;
    setTodos((todos) => 
      [...todos,
         {
        text : newTodo.trim(),
        id: Math.floor(Math.random() * 100) 
      }]);
    setNewTodo("");
  };

  const handleClose = (id) => {
    setTodos((todos) => {
    return todos.filter(t=> t.id !==id);
    }
    )
    
  }
  
  return (
    <div className='container'>
      <input type="text" placeholder='New Todo'
       value={newTodo} 
       onChange={(e) => setNewTodo( e.target.value)
       } />


       <button onClick={handleSubmit}>Submit</button>

       <ul className='todos-list'>
        {todos.map(({text, id})=>(
          <li key={id} className='todo'>
            <span>{text}</span>
            <button className='close' onClick= {()=> handleClose(id)} > X </button>
          </li>
        ))}
       </ul>
    </div>
  )
}

export default Todo