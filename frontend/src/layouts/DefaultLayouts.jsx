import { Outlet, NavLink } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <header style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
        <nav class="nav justify-content-center d-flex gap-2">
          <NavLink to="/" className="nav-link fs-3 fw-bold">Task List</NavLink>
          <NavLink to="/addTask" className="nav-link fs-3 fw-bold">Add Task</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

    </>
  )
}