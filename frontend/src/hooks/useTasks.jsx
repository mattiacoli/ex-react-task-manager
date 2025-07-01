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
  const addTask = async (obj) => {
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTasks([...tasks, obj])
        } else {
          throw new Error(data.message)
        }
      })
  }

  // REMOVE TASK
  const removeTask = () => { }

  // EDIT TASK
  const editTask = () => { }

  return {
    tasks,
    addTask,
    removeTask,
    editTask
  }


}