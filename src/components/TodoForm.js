import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {

const [input, setInput] = useState("");

const inputFocus = useRef(null);


useEffect(() => {
    inputFocus.current.focus();
})

const handleChange = e => { 
    setInput(e.target.value);
}



const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
        id: Math.random()*(1000-201)+200,
        title: input,
        completed: false,

    });

    setInput('');
}
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Add a task" 
            value={input} 
            name="title" 
            className="todoFormInput"
            onChange={handleChange}
            ref={inputFocus}
        />
        <button className="todoFormButton">Add a Task</button>
    </form>

  )
}

export default TodoForm
