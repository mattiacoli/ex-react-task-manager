import { useState, useEffect } from 'react'

const baseURL = import.meta.env.VITE_API_URL

export default function useTasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        console.log(data)
      })
      .catch(error => console.error(error.message))
  }, [])

  const addTask = () => { }
  const removeTask = () => { }
  const editTask = () => { }

  return {
    tasks,
    addTask,
    removeTask,
    editTask
  }


}