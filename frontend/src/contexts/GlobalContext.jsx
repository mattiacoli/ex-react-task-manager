import { createContext, useContext, useEffect, useState } from "react";

import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()




function GlobalProvider({ children }) {

  const { tasks, addTask, updateTask, removeTask, removeMultipleTasks } = useTasks()

  return (
    <GlobalContext.Provider value={{ tasks, addTask, updateTask, removeTask, removeMultipleTasks }}>
      {children}
    </GlobalContext.Provider>
  )

}

function useGlobalContext() {
  const context = useContext(GlobalContext)
  return context
}

export { GlobalProvider, useGlobalContext }

