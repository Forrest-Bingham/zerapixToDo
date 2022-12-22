import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import Axios from 'axios';

function TodoList() {
    const [todos,setTodos] = useState([{id:999999,title:"Click to toggle for completion",completed:false}]);

    const getApiToDo = () => {
        Axios.get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          var random1 = Math.floor(Math.random()*199);
        //   var random2 = Math.floor(Math.random()*199);
        //   var random3 = Math.floor(Math.random()*199);
          var task1 = response.data[random1];
        //   var task2 = response.data[random2];
        //   var task3 = response.data[random3];
          const newTodo1={
            id:task1.id,
            title:task1.title,
            completed:task1.completed
          }
          const newApiTodos = [newTodo1, ...todos]
        //   const newTodo2={
        //     id:task2.id,
        //     title:task2.title,
        //     completed:task2.completed
        //   }
        //   const newTodo3={
        //     id:task3.id,
        //     title:task3.title,
        //     completed:task3.completed
        //   }

        //   const newApiTodos = [newTodo1, newTodo2, newTodo3, ...todos]
          setTodos(newApiTodos);

        })

        
    
      }

    const addTodo = todo => {
        //Checks for empty spaces and large spaces between letters
        if(!todo.title || /^\s*$/.test(todo.title)){
            return;
        }
        const newTodos = [todo, ...todos]
        setTodos(newTodos);
        
    }

    const editTodo = (taskId, newValue) => {
        if(!newValue.title || /^\s*$/.test(newValue.title)){
            return;
        }
        //Finds the task whose id we are using and changes title if there is a change
        setTodos(previous => previous.map(task => (task.id === taskId ? newValue : task))
        )
    }

    const deleteTodo = id => {
        //Filters through todo list, if id is not the id that needs to be deleted, keep it.
        const deleteTask = [...todos].filter(todo => todo.id !== id)
        //once the id has been found, delete it, update the state of todos with new list
        setTodos(deleteTask)
    }

    const completeTodo = id => {
        //Map through and toggle the todo who was clicked
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(updatedTodos);
    }

  return (
    <div>
        <div className="listHeader">
            <h1>Welcome to your Task Manager</h1>
        </div>
        <div className="getApiTodo">
            <button className="apiButton" onClick={getApiToDo}>Click to get an API Task</button>
        </div>
        <div className="toDoFormArea">
            <TodoForm onSubmit={addTodo}/>
            <Todo 
                todos={todos}
                completeTodo={completeTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        </div>
    </div>
  )
}

export default TodoList
