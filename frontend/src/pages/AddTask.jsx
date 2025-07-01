import { useState, useRef, useMemo } from 'react'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  // controlled input
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  // uncontrolled input
  const descriptionRef = useRef()
  const statusRef = useRef()

  // title validation
  const isTitleValid = useMemo(() => {
    const titleLenght = title.trim().length > 0
    const charIsValid = !title.split('').some(char => symbols.includes(char.toLowerCase()))
    return titleLenght && charIsValid
  }, [title])

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault()

    if (isTitleValid) {
      console.log(`
        Titolo : ${title}
        Descrizione : ${descriptionRef.current.value}
        Stato: ${statusRef.current.value}
        `);

    }
  }

  return (
    <div className="container">
      <h1 className="text-center">AddTask</h1>

      <div className="container my-4">
        <form action="" onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              className='form-control'
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titolo"
              required />

            {title.trim().length > 0 && (
              <p style={{ color: isTitleValid ? 'green' : 'red', marginTop: '.5rem', fontWeight: 500 }}>
                {isTitleValid ? 'Titolo Valido' : 'il titolo non puo` contenere simboli'}
              </p>
            )}
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

          <button type='submit' className='btn btn-primary'>Add Task</button>
        </form>
      </div >
    </div >
  )
}