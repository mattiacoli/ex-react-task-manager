// hooks
import { useGlobalContext } from "../contexts/GlobalContext"
import { useState, useMemo, useRef, useCallback } from 'react'

// components
import TaskRow from "../components/TaskRow"

// debounce function
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay)
  };
}


export default function TaskList() {
  // Global Context
  const { tasks = [], removeMultipleTasks } = useGlobalContext()

  //ref
  const queryRef = useRef()


  // state
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTaskIds, setSelectedTaskIds] = useState([])

  const toggleSelection = (taskID) => {
    if (!selectedTaskIds.includes(taskID)) {
      setSelectedTaskIds(prev => [...prev, taskID])
    } else {
      setSelectedTaskIds(prev => prev.filter(id => id !== taskID))
    }
  }

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

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query)
    }, 300)
    , [])



  const sortedTasks = useMemo(() => {
    const copia = [...tasks]

    const filteredTasks = copia.filter(t => {
      return t.title?.toLowerCase().includes(searchQuery.toLowerCase())
    })


    filteredTasks.sort((a, b) => {
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
    return filteredTasks
  }, [tasks, sortBy, sortOrder, searchQuery])


  return (

    <div className="container my-4">

      <h1 className="text-center">Task List</h1>

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca..."
          ref={queryRef}
          onChange={() => handleSearch(queryRef.current?.value || '')} />
      </div>

      {/* Task list table */}
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} >Nome</th>
            <th onClick={() => handleSort("status")}>Stato</th>
            <th className='text-end' onClick={() => handleSort("createdAt")}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              checked={selectedTaskIds.includes(task.id)}
              onToggle={toggleSelection} />
          ))}
        </tbody>
      </table>

      {selectedTaskIds.length > 0 && (
        <button
          className="btn btn-danger"
          onClick={() => removeMultipleTasks(selectedTaskIds)}>Elimina Tasks selezionate</button>
      )}

    </div>
  )
}