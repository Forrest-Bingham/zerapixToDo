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
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>;
    }

  return todos.map((todo,id) => (
    <div className={todo.isComplete ? 'todo-row complete' :'todo-row'} key={id}>
        <div key={todo.id} onClick={()=> completeTodo(todo.id)}>
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
