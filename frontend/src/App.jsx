// react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// layout
import DefaultLayout from './layouts/DefaultLayouts'

// pages
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path='/' Component={TaskList} />
          <Route path='/addTask' Component={AddTask} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
