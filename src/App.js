import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react';
import { TodoistApi } from "@doist/todoist-api-typescript";
import './app.scss';
import Dropdown from '../node_modules/react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';
import { useRef } from 'react';
import ReactDOM from 'react-dom';


// import axios from 'axios';
// import TaskList from './components/TaskList';  

const TODOIST_TOKEN = "bf64581b00fb7777bb6865894d61fef991d44c3d"
const api = new TodoistApi(TODOIST_TOKEN)


var _proyecto = "Valor inicial";
var _id = '*';
var _proyecto;


function App() {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  var proyectos;
  var element, node, textnode, texto;

  const changeProject = (id, proyecto, projects, tasks) => {
    _proyecto = proyecto;
    if (proyecto === "Todos") { _id = "*" } else { _id = id };
    element = document.getElementById("tabla-s");
    console.log('Elemento: ' + element);
    if (element != null) element.remove();
    node = document.createElement("div");
    node.id = 'tabla-s';
    textnode = document.createTextNode("Water");
    element = document.getElementById("padre");
    element.appendChild(node);
    element = document.getElementById("tabla-s");
    // Aquí tuve problemas para renderizar la tabla con el nuevo filtro,
    // No encuentro como renderizar desde otra función que no sea la principal
    return (
      projects.filter((p) => (p.id === _id || _id === '*')).map(project => (
        <div>
          <table class="table table-striped table-bordered">
            <thead>
              <tr class="table-secondary">
                <th data-field="id" data-width="10" data-width-unit="%">{project.id}</th>
                <th data-field="name" data-width="50" data-width-unit="%">{project.name}</th>
              </tr>
            </thead>
            <tbody>
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
    )
  }


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
    <div class="container-sm">
      < h3 > Listado de cosas por hacer utilizando la API de todoist:  </h3 >
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Menú</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://todoist.com/app/today" target="_blank" >todoist.com</a>
              </li>

              <li class="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Proyecto
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item value="Todos" onClick={() => { changeProject("*", "Todos", projects, tasks) }} >Todos</Dropdown.Item>
                    {projects.map(project => (
                      <Dropdown.Item key={project.id} value={project.name} onClick={() => { changeProject(project.id, project.name, projects, tasks) }}   >
                        {project.name}
                      </Dropdown.Item>
                    ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>

          {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            </input>
            <button class="btn btn-outline-success" type="submit">Búsqueda</button>
          </form> */}
        </div>
      </nav >

      <div id="padre">
        <div id="tabla-s">
          {projects.filter((p) => (p.id === _id || _id === '*')).map(project => (
            <div>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr class="table-secondary">
                    <th data-field="id" data-width="10" data-width-unit="%">{project.id}</th>
                    <th data-field="name" data-width="50" data-width-unit="%">{project.name}</th>
                  </tr> 
                </thead>
                <tbody>
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
    </div >
  )
}



export default App;