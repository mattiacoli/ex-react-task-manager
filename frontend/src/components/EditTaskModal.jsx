import { useState, useRef } from 'react'
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave, }) {

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [stato, setStato] = useState(task.status)

  const editFormRef = useRef()

  const handleConfirm = (e) => {
    e.preventDefault

    const editedTask = {
      title: title,
      description: description,
      status: stato
    }
    editFormRef.current.requestSubmit()

    onSave(editedTask)

  }



  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={onSave} >
          <div className="mb-3">
            <input
              className='form-control'
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titolo"
              required />
          </div>

          <div className="mb-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="descrizione"
              className='form-control' />
          </div>


          <div className="mb-3 d-flex gap-2">
            <label>Stato</label>
            <select
              name="status"
              id="status"
              className='form-select'
              value={stato}
              onChange={(e) => setStato(e.target.value)}>
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
      show={show}
      onClose={onClose}
      confirmText="Salva"
      onConfirm={handleConfirm}

    />
  )
}