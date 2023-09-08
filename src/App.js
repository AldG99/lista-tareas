import React, { useState } from 'react';
import './App.scss';

function App() {
  // Estados iniciales
  const initialTaskState = {
    text: '',
    priority: 'media',
    category: 'general',
    dueDate: null,
  };

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState(initialTaskState.priority);
  const [taskCategory, setTaskCategory] = useState(initialTaskState.category);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para agregar una tarea
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
      setTaskPriority(initialTaskState.priority);
      setTaskCategory(initialTaskState.category);
      setSearchTerm('');
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Función para actualizar una tarea
  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <div className='container'>
      <h1>Lista de Tareas (To-Do List)</h1>
      <div>
        {/* Formulario de entrada de tareas */}
        <div className='task-input-form'>
          <input
            type='text'
            placeholder='Nueva tarea'
            value={newTask}
            onChange={(e) => {
              if (e.target.value.length <= 40) {
                setNewTask(e.target.value);
              }
            }}
            maxLength={40}
          />

          <select
            className='select-prioridad'
            onChange={(e) => setTaskPriority(e.target.value)}
            value={taskPriority}
          >
            <option value='alta'>Alta prioridad</option>
            <option value='media'>Prioridad media</option>
            <option value='baja'>Baja prioridad</option>
          </select>

          <select
            className='select-categoria'
            onChange={(e) => setTaskCategory(e.target.value)}
            value={taskCategory}
          >
            <option value='personal'>Personal</option>
            <option value='trabajo'>Trabajo</option>
            <option value='compras'>Compras</option>
          </select>

          <button onClick={addTask}>Agregar</button>
        </div>

        {/* Barra de búsqueda */}
        <div className='search-task'>
          <input
            type='text'
            placeholder='Buscar tareas'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de tareas */}
      <ul className='task-list'>
        {tasks
          .filter((task) =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task, index) => (
            <li className='task-item' key={index}>
              <table className='task-table'>
                <tbody>
                  <tr>
                    <td className='task-label'>Tarea:</td>
                    <td className='task-value'>{task.text}</td>
                  </tr>
                  <tr>
                    <td className='task-label'>Prioridad:</td>
                    <td className='task-value'>{task.priority}</td>
                  </tr>
                  <tr>
                    <td className='task-label'>Categoría:</td>
                    <td className='task-value'>{task.category}</td>
                  </tr>
                </tbody>
              </table>

              {/* Acciones de la tarea */}
              <div className='task-actions'>
                <button className='delete-button' onClick={() => deleteTask(index)}>
                  Eliminar
                </button>

                <button
                  className='edit-button'
                  onClick={() => {
                    const updatedText = prompt('Editar tarea:', task.text);
                    if (updatedText !== null) {
                      updateTask(index, { ...task, text: updatedText });
                    }
                  }}
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
