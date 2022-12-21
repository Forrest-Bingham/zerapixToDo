import React, {useState} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import Axios from 'axios';

function TodoList() {
    const [todos,setTodos] = useState([]);

    const getApiToDo = () => {
        Axios.get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          console.log(response);
          var random1 = Math.floor(Math.random()*199);
          var random2 = Math.floor(Math.random()*199);
          var random3 = Math.floor(Math.random()*199);
          console.log(random1,random2,random3);
          var task1 = response.data[random1];
          var task2 = response.data[random2];
          var task3 = response.data[random3];
          console.log(task1,task2,task3);
          const newTodo1={
            id:task1.id,
            title:task1.title,
            completed:task1.completed
          }
          const newTodo2={
            id:task2.id,
            title:task2.title,
            completed:task2.completed
          }
          const newTodo3={
            id:task3.id,
            title:task3.title,
            completed:task3.completed
          }

          const newApiTodos = [newTodo1, newTodo2, newTodo3, ...todos]
          setTodos(newApiTodos);

        })

        
    
      }

    const addTodo = todo => {
        console.log('Adding to do');
        if(!todo.title || /^\s*$/.test(todo.title)){
            return;
        }

        const newTodos = [todo, ...todos]
        console.log(newTodos);
        setTodos(newTodos);
        
    }

    const editTodo = (taskId, newValue) => {
        console.log(taskId,newValue);
        if(!newValue.title || /^\s*$/.test(newValue.title)){
            return;
        }

        setTodos(previous => previous.map(task => (task.id === taskId ? newValue : task))
        )
        console.log(setTodos);
    }

    const deleteTodo = id => {
        //Filters through todo list, if id is not the id that needs to be deleted, keep it.
        const deleteTask = [...todos].filter(todo => todo.id !== id)
        //once the id has been found, delete it, update the state of todos with new list
        setTodos(deleteTask)
    }

    const completeTodo = id => {
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
      <h1>What are we doing today?</h1>
      <button onClick={getApiToDo}>Get Tasks</button>
      <TodoForm onSubmit={addTodo}/>
      <Todo 
        todos={todos}
        completeTodo={completeTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default TodoList
