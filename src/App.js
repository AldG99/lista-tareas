import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedText;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Lista de Tareas (To-Do List)</h1>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button onClick={() => deleteTask(index)}>Eliminar</button>
            <button
              onClick={() => {
                const updatedText = prompt('Editar tarea:', task);
                if (updatedText !== null) {
                  updateTask(index, updatedText);
                }
              }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
