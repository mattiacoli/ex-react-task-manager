// hooks
import { useGlobalContext } from "../contexts/GlobalContext"
import { useState, useMemo } from 'react'

// components
import TaskRow from "../components/TaskRow"


export default function TaskList() {

  const { tasks = [] } = useGlobalContext()

  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)

  const statusOrder = {
    "To do": 0,
    "Doing": 1,
    "Done": 2
  };

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(prev => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  }

  const sortedTasks = useMemo(() => {
    const copia = [...tasks]
    copia.sort((a, b) => {
      let result = 0

      if (sortBy === 'title') {
        result = a.title.localeCompare(b.title)
      } else if (sortBy === 'status') {
        result = statusOrder[a.status] - statusOrder[b.status]
      } else if (sortBy === 'createdAt') {
        result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }

      return result * sortOrder

    })
    return copia
  }, [tasks, sortBy, sortOrder])


  console.log(sortBy, sortOrder)


  return (

    <div className="container my-4">

      <h1 className="text-center">Task List</h1>

      {/* Task list table */}
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} >Nome</th>
            <th onClick={() => handleSort("status")}>Stato</th>
            <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>

    </div>
  )
}