import { useState, useEffect } from 'react'

const baseURL = import.meta.env.VITE_API_URL

export default function useTasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        setTasks(data)
      })
      .catch(error => console.error(error.message))
  }, [])

  // ADD TASK
  const addTask = async (task) => {
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTasks([...tasks, task])
        } else {
          throw new Error(data.message)
        }
      })
  }

  // REMOVE TASK
  const removeTask = async (taskID) => {
    fetch(`${baseURL}/${parseInt(taskID)}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTasks(tasks.filter(t => t.id !== taskID))
        } else {
          throw new Error(data.message)
        }
      })
  }

  // EDIT TASK
  const updateTask = async (updatedTask) => {
    await fetch(`${baseURL}/${parseInt(updatedTask.id)}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTasks([...tasks, updatedTask])
        } else {
          throw new Error(data.message)
        }
      })
  }


  return {
    tasks,
    addTask,
    removeTask,
    updateTask
  }
}