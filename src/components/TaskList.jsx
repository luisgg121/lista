import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react'; // 'react-native';
import '../App.tsx';
import '../App.css';

const TaskList = ({ tasks, projects1 }) => {
    const [projects, setProjects1] = useState([]) 
    useEffect(() => {
        if (Array.isArray(tasks) && Array.isArray(projects)) {
            const allprojects = projects.map((project) => ({
                title: project.name,
                data: tasks.filter((f) => f.projectId == project.id).map(t => t.content)
            }));
            setProjects1(allprojects)
        }
    }, [projects, tasks])
 
    return (   
        <div>
            <h2>Proyectos....</h2>
            {projects.map(project => (
                <div key={project.id}>
                    <h1>{project.name}</h1>
                    {tasks.map(task => (
                        <div key={task.id}>
                            <h1>{task.content}</h1>
                        </div>
                    ))
                    }
                </div> 
            )) 
            }
        </div>
    );
};

export default TaskList; 