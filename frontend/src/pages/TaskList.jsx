import { useGlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"


export default function TaskList() {

  const { tasks = [] } = useGlobalContext()

  return (

    <div className="container my-4">

      <h1 className="text-center">Task List</h1>

      {/* Task list table */}
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>

    </div>
  )
}