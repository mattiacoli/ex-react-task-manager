// react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Global Context
import { GlobalProvider } from './contexts/GlobalContext'

// layout
import DefaultLayout from './layouts/DefaultLayouts'

// pages
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import TaskDetails from './pages/TaskDetails'

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path='/' Component={TaskList} />
            <Route path='/addTask' Component={AddTask} />
            <Route path='/task/:id' Component={TaskDetails} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  )
}

export default App
