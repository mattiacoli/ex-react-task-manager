// hooks
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext'
import { useState } from 'react';

// component
import dayjs from 'dayjs';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';

export default function TaskDetails() {
  const { id } = useParams()
  const { tasks = [], removeTask, updateTask } = useGlobalContext()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const selectedTask = tasks.find(t => t.id === parseInt(id))
  const date = dayjs(selectedTask.createdAt)

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

  // edit handler
  const handleEdit = async (editedTask) => {
    try {
      const updatedTask = { ...selectedTask, ...editedTask }
      await updateTask(updatedTask)
      alert('Modifica avvenuta con successo')
      setShowEdit(false)
      window.location.reload();
    } catch (error) {
      alert(`Error : ${error.message}`)
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
              <p>{date.format('DD/MM/YYYY')}</p>
            </div>
          </div>

          <button
            className='btn  btn-warning'
            onClick={() => setShowEdit(true)}>Edit</button>

          <button
            className='btn btn-danger'
            onClick={() => setShow(true)}>Delete</button>


          {/* Delete Modal */}
          <Modal
            title="Eliminare la task ?"
            content="Conferma se vuoi davvero eliminare la task"
            show={show}
            onClose={() => setShow(false)}
            onConfirm={() => deleteTask(selectedTask.id)}
          />

          {/* Edit Task Modal */}
          <EditTaskModal
            show={showEdit}
            onClose={() => setShowEdit(false)}
            task={selectedTask}
            onSave={handleEdit}
          />
        </>
      )}


    </div >
  )
}