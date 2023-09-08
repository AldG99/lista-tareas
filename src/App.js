import React, { useState } from 'react';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskCategory, setTaskCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        text: newTask,
        priority: taskPriority,
        category: taskCategory,
        dueDate: null,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskPriority('medium');
      setTaskCategory('general');
      setSearchTerm('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Lista de Tareas (To-Do List)</h1>
      <div>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className="select-prioridad" // Agrega la clase CSS a la barra de selección de prioridad
          onChange={(e) => setTaskPriority(e.target.value)}
          value={taskPriority}
        >
          <option value="high">Alta prioridad</option>
          <option value="medium">Prioridad media</option>
          <option value="low">Baja prioridad</option>
        </select>
        <select
          className="select-categoria" // Agrega la clase CSS a la barra de selección de categoría
          onChange={(e) => setTaskCategory(e.target.value)}
          value={taskCategory}
        >
          <option value="personal">Personal</option>
          <option value="work">Trabajo</option>
          <option value="shopping">Compras</option>
        </select>
        <button onClick={addTask}>Agregar</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Buscar tareas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {tasks
          .filter((task) =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task, index) => (
            <li key={index}>
              <span>{task.text}</span>
              <span> | Prioridad: {task.priority}</span>
              <span> | Categoría: {task.category}</span>
              {task.dueDate && <span> | Vence el: {task.dueDate}</span>}
              <button onClick={() => deleteTask(index)}>Eliminar</button>
              <button
                onClick={() => {
                  const updatedText = prompt('Editar tarea:', task.text);
                  if (updatedText !== null) {
                    updateTask(index, { ...task, text: updatedText });
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
