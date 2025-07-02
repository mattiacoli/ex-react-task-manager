import { createPortal } from 'react-dom'


export default function Modal({ title, content, show, onClose, onConfirm, confirmText }) {

  return show && createPortal(
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h2>{title}</h2>
        <div className="custom-modal-content">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
        <div className="custom-modal-buttons">
          <button className={`btn btn-${confirmText ? 'success' : 'danger'}`} onClick={onConfirm}>
            {confirmText || 'Conferma'}
          </button>
          <button className='btn btn-secondary' onClick={onClose}>
            Annulla
          </button>
        </div>
      </div>
    </div>,
    document.body
  )

}