import { memo } from 'react'
import { Link } from 'react-router-dom'

const TaskRow = memo(function TaskRow({ task, checked, onToggle }) {
  return (
    <tr className="tab_row">
      <td className='d-flex gap-2'>
        <span>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(task.id)}
            className='form-check-input'
          />
        </span>
        <Link to={`/task/${task.id}`} className='text-decoration-none text-black'>{task.title}</Link>
      </td>

      <td className={`status ${task.status?.toLowerCase().replaceAll(' ', '')}  text-center`}>{task.status}</td>
      <td className='text-end'>{new Date(task.createdAt).toLocaleString()}</td>
    </tr>
  )
})

export default TaskRow