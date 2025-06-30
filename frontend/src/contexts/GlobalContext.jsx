import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext()

const baseURL = import.meta.env.VITE_API_URL


function GlobalProvider({ children }) {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        setTasks(data)
        console.log(data)
      })
      .catch(error => console.error(error.message))
  }, [])

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )

}

function useGlobalContext() {
  const context = useContext(GlobalProvider)
  return context
}

export { GlobalProvider, useGlobalContext }

