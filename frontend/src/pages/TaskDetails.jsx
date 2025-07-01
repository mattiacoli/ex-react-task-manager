import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext'

export default function TaskDetails() {
  const { id } = useParams()
  const { tasks = [], removeTask } = useGlobalContext()
  const navigate = useNavigate()

  const selectedTask = tasks.find(t => t.id === parseInt(id))

  // delete handler
  const deleteTask = async () => {
    try {
      await removeTask(parseInt(id))
      alert("Task Eliminata con successo")

    } catch (error) {
      alert(`Error : ${error.message}`)
    } finally {
      navigate('/')
    }

  }

  return (

    <div className="container d-flex flex-column justify-content-center gap-3 mt-5">

      {(!selectedTask) ? <h4>Task non trovata</h4> : (
        <>
          {/* Task Card */}
          <div className="card w-50">
            <div className="card-header">
              <h3 className='text-center'>{selectedTask.title}</h3>
            </div>
            <div className="card-body">
              <p>{selectedTask.description}</p>
            </div>
            <div className={`card-footer status ${selectedTask.status?.toLowerCase().replaceAll(' ', '')}`}>
              <p>{selectedTask.status}</p>
              <p>{new Date(selectedTask.createdAt).toDateString()}</p>
            </div>
          </div>

          <button
            className='btn btn-danger'
            onClick={deleteTask}>Delete</button>
        </>
      )}


    </div >
  )
}