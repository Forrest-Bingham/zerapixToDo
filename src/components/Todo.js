import React, {useState} from 'react'
import {BiEdit} from "react-icons/bi"
import {SlClose} from "react-icons/sl"
import TodoForm from './TodoForm'


function Todo({todos, completeTodo, editTodo, deleteTodo}) {
    const [edit, setEdit] = useState({
        id:null,
        value:""
    })

    const submitUpdate = value => {
        editTodo(edit.id,value)
        setEdit({
            id:null,
            value:""
        })
    }

    if(edit.id){
        return <div className="edit"><TodoForm edit={edit} onSubmit={submitUpdate}/></div>;
    }

  return todos.map((todo,id) => (
    <div className={todo.completed ? 'todoRowComplete' :'todoRow'} key={id}>
        <div className="toDoTitle" key={todo.id} onClick={()=> completeTodo(todo.id)}>
            {todo.title}
        </div>

        <div className="icons">
            <BiEdit onClick={()=> setEdit({id:todo.id, value:todo.title})} className="edit-icon"/>
            <SlClose onClick={()=> deleteTodo(todo.id)} className="delete-icon"/>
        </div>
    </div>
  ))
}

export default Todo
