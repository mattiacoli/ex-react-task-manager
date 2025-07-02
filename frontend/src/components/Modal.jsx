import { createPortal } from 'react-dom'


export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

  return show && createPortal(
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h2>{title}</h2>
        {content}
        <button className='btn btn-danger' onClick={onConfirm}>{confirmText || 'Conferma'}</button>
        <button className='btn btn-warning' onClick={onClose}>Annulla</button>
      </div>
    </div>,
    document.body
  )

}