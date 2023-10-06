import React, { useEffect, useState } from 'react';
// import { SectionList, StyleSheet, Text, View } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript";
import './App.css';
// import axios from 'axios';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import type { } from '@mui/x-data-grid/themeAugmentation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import {
  randomInt,
  randomUserName,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const TODOIST_TOKEN = "bf64581b00fb7777bb6865894d61fef991d44c3d"
const api = new TodoistApi(TODOIST_TOKEN)

var columns: GridColDef[] = [
  { field: 'col1', headerName: 'Descripción', width: 150 },
  { field: 'col2', headerName: 'Prioridad', width: 150 },
];

// Definimos y llenamos la tabla: */}
var rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' }
];

var temp: GridRowsProp;

function App() {

  const apiRef = useGridApiRef();

  const handleUpdateRow = () => {
    const rowIds = apiRef.current.getAllRowIds();
    const rowId = randomArrayItem(rowIds);

    apiRef.current.updateRows([{ id: rowId, username: randomUserName() }]);
  };

  const handleUpdateAllRows = () => {
    const rowIds = apiRef.current.getAllRowIds();

    apiRef.current.updateRows(
      rowIds.map((rowId) => ({ id: rowId, username: randomUserName() })),
    );
  };

  const handleDeleteRow = () => {
    const rowIds = apiRef.current.getAllRowIds();
    const rowId = randomArrayItem(rowIds);

    apiRef.current.updateRows([{ id: rowId, _action: 'delete' }]);
  };

  const handleAddRow = () => {
    apiRef.current.updateRows([{ id: "10", col1: "Nombre", col2: 'is Amazing' }]);
  };


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

    }
  })

  fetchData();

}, []);


// }, []);

return (
  <div>
    <h2>Listado de Cosas por Hacer: </h2>
    {projects.map(project => (
      <div key={project.id}>
        <h2>{project.name}</h2>
        {/* apiRef.current.updateRows([{ id: "10", col1: "Nombre" }]); */}
        {/* temp = [{ id: 6, col1: 'MUI', col2: 'is Amazing' }] */}
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
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleUpdateRow}>
          Update a row
        </Button>
        <Button size="small" onClick={handleUpdateAllRows}>
          Update all rows
        </Button>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGridPro apiRef={apiRef} rows={rows} columns={columns} />
      </Box>
    </Box>

    <div>
      {
        // projects.map(project => (handleAddRow())) 
        // projects.map(project => (rows.updateRows([ {id: {project.id}, col1: {project.name}}])))
        // apiRef.current.updateRows([{ id: 1, _action: 'delete' }]);
        // // {
        //   tasks.filter((f) => f.projectId == project.id).map(task => (
        //     // apiRef.current.updateRows([{ id: 1, _action: 'delete' }]);
        //     rows.updateRows([{ id: {task.id}, col1: {task.content}, col2: {task.priority} }, _action: 'add' ]);
        //     // rows.concat(id: {task.id}, col1: {task.content}, col2: {task.priority})
        // ))
      }


      {/* {projects.map(project => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <div>
            {tasks.filter((f) => f.projectId == project.id).map(task => (
              <div key={task.id}>
                <p>{task.content}</p>
                <p>  {task.priority}</p>
              </div>
            ))
            }
          </div>
        </div>
      ))
      } */}

    </div>
  </div>






  // <div>
  //   <h2>Listado de Cosas por Hacer: </h2>
  //   <DataGrid rows={rows} columns={columns} />
  //   <div>
  //     {projects.map(project => (
  //       <div key={project.id}>
  //         <h2>{project.name}</h2>
  //         <div>
  //           {tasks.filter((f) => f.projectId == project.id).map(task => (
  //             <div key={task.id}>
  //               <p>{task.content}</p>
  //               <p>  {task.priority}</p>
  //             </div>
  //           ))
  //           }
  //         </div>
  //       </div>
  //     ))
  //     }

  //   </div>
  // </div>

);
}

export default App;
