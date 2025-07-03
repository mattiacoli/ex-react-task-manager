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

    if (tasks.map(t => t.title).includes(task.title)) {
      throw new Error(`Task con nome ${task.title} esiste già`)

    } else {
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


  // REMOVE MULTIPLE TASKS
  const removeMultipleTasks = async (tasksIds) => {

    const tasksPromise = tasksIds.map(id => {
      return fetch(`${baseURL}/${id}`, {
        method: "DELETE"
      })
    })

    const data = await Promise.allSettled(tasksPromise)

    data.forEach((result, index) => {
      if (result.status === "rejected") {
        throw new Error(`Non sono state eliminate le task con id:${tasksIds[index]}`)
      }
    })

    setTasks(tasks.filter(t => !tasksIds.includes(t.id)))
    window.location.reload();
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
    updateTask,
    removeMultipleTasks
  }
}