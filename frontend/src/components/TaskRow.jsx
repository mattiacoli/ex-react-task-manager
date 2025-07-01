import { memo } from 'react'

const TaskRow = memo(function TaskRow({ task }) {
  return (
    <tr className="tab_row">
      <td>{task.title}</td>
      <td className={`status ${task.status?.toLowerCase().replaceAll(' ', '')} `}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleString()}</td>
    </tr>
  )
})

export default TaskRow