import { useState, useRef } from 'react'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  // controlled input
  const [title, setTitle] = useState('')

  // uncontrolled input
  const descriptionRef = useRef()
  const statusRef = useRef()


  return (
    <div className="container">
      <h1 className="text-center">AddTask</h1>

      <div className="container my-4">
        <form action="">
          <div className="mb-3">

            <input
              className='form-control'
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titolo" />
          </div>

          <div className="mb-3">
            <textarea
              ref={descriptionRef}
              name="description"
              placeholder="descrizione"
              className='form-control' />
          </div>


          <div className="mb-3 d-flex gap-2">
            <label htmlFor="staus">Stato</label>
            <select name="status" id="status" ref={statusRef} className='form-select'>
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}