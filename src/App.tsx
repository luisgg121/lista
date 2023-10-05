import React, { useEffect, useState } from 'react';
// import { SectionList, StyleSheet, Text, View } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript";
// import TaskList from './components/TaskList';
//   
import './App.css';
import axios from 'axios';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const TODOIST_TOKEN = "bf64581b00fb7777bb6865894d61fef991d44c3d"
const api = new TodoistApi(TODOIST_TOKEN)

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

// Definimos y llenamos la tabla: */}
const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

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



    // {
    //   projects.map(project => (
    //     <div key={project.id}>
    //       <h2>{project.name}</h2>
    //       <div>
    //         {tasks.filter((f) => f.projectId == project.id).map(task => (
    //           <div key={task.id}>
    //             <p>{task.content}</p>
    //           </div>
    //         ))
    //         }
    //       </div>
    //     </div>
    //   ))
    // }


  }, []);

  return (

    //   <div>
    //     <div>
    //   {/* <div style={{ height: 300, width: '100%' }}> */}
    //   <DataGrid rows={rows} columns={columns} />
    //   </div>
    // </div>
    <div>
      <h2>Listado de Cosas por Hacer# </h2>
      <DataGrid rows={rows} columns={columns} />
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
