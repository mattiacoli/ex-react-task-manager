import { memo } from 'react'
import { Link } from 'react-router-dom'

const TaskRow = memo(function TaskRow({ task }) {
  return (
    <tr className="tab_row">
      <td><Link to={`/task/${task.id}`} className='text-decoration-none text-black'>{task.title}</Link></td>
      <td className={`status ${task.status?.toLowerCase().replaceAll(' ', '')} `}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleString()}</td>
    </tr>
  )
})

export default TaskRow