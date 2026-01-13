import "./App.css";
import { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getAllTasks().then((res) => setTasks(res.data));
  };

  const addTask = () => {
    if (!title.trim()) return;

    createTask({ title, description: "", completed: false }).then(() => {
      setTitle("");
      loadTasks();
    });
  };

  const toggleComplete = (task) => {
    updateTask(task.id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    }).then(loadTasks);
  };

  const removeTask = (id) => {
    deleteTask(id).then(loadTasks);
  };

 return (
   <div className="page">
     <div className="container">
       <h2>Task Tracker</h2>

       <div className="input-group">
         <input
           placeholder="Enter a new task"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
         />
         <button className="add-btn" onClick={addTask}>
           ➕ Add
         </button>
       </div>

       {tasks.length === 0 && (
         <p className="empty-state">📭 No tasks yet. Add one above!</p>
       )}

       <ul className="task-list">
         {tasks.map((task) => (
           <li className="task-item" key={task.id}>
             <span
               className={`task-title ${
                 task.completed ? "completed" : ""
               }`}
               onClick={() => toggleComplete(task)}
             >
               {task.completed ? "✔️ " : "⬜ "} {task.title}
             </span>
             <button
               className="delete-btn"
               onClick={() => removeTask(task.id)}
             >
               🗑️
             </button>
           </li>
         ))}
       </ul>
     </div>
   </div>
 );


}

export default App;
