
export default function TaskRow({ task }) {

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.status}</td>
      <td
        className="status"

      >{new Date(task.createdAt).toLocaleString()}</td>
    </tr>
  )
}