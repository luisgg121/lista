import React, { useEffect, useState } from 'react';
// import { SectionList, StyleSheet, Text, View } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript";
// import TaskList from './components/TaskList';  
import './app.scss';
// import axios from 'axios';

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
    <div class="container">
      <h2>Listado de Cosas por Hacer- </h2>
      <div>
        {projects.map(project => (
          <div>
            <table class="table table-striped table-bordered">
              <thead>
                <tr class="table-secondary">
                  <th data-field="id" data-width="10" data-width-unit="%">{project.id}</th>
                  <th data-field="name" data-width="50" data-width-unit="%">{project.name}</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                <td>{project.id}</td>
                <td>{project.name}</td>
              </tr> */}
                {
                  tasks.filter((f) => f.projectId === project.id).map(task => (

                    <tr>
                      <td>{task.id}</td>
                      <td>{task.content}</td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
            <p></p>
          </div>
        ))
        }

      </div>
    </div>
  )
}
// return (
//   <div>
//     <h2>Listado de Cosas por Hacer: </h2>
//     <div>
//       <table class="table table-hover">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>DESCRIPCIÓN</th>
//           </tr>
//         </thead>
//         {projects.map(project => (
//           <tbody>
//             <tr>
//               <td>{project.id}</td>
//               <td>{project.name}</td>
//             </tr>
//               {
//                 tasks.filter((f) => f.projectId === project.id).map(task => (

//                   <tr>
//                     <td>{task.id}</td>
//                     <td>{task.content}</td>
//                   </tr>

//                 ))
//               }
//            </tbody>
//         ))
//         }
//        </table>
//     </div>
//   </div>
// )





export default App;