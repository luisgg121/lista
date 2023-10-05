import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript";
// import TaskList from './components/TaskList';
//   
import './App.css';
import axios from 'axios';

const TODOIST_TOKEN = "bf64581b00fb7777bb6865894d61fef991d44c3d"
const api = new TodoistApi(TODOIST_TOKEN)

function App() {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        api.getProjects()
          .then((projects) => setProjects(projects))
          .catch(() => setProjects([]))
        // Obtiene la lista de tareas
        api.getTasks()
          .then((response) => setTasks(response))
          .catch(() => setTasks([]))
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Listado de Cosas por Hacer... </h2>
      <div>
        {projects.map(project => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <div>
              {tasks.filter((f) => f.projectId == project.id).map(task => (
                <div key={task.id}>
                  <p>{task.content}</p>
                </div>
              ))
              }
            </div>
          </div>
        ))
        }

      </div>
    </div>

  );
}

export default App;
