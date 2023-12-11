import { createContext, useState } from "react";

const DataContext = createContext(null)

const DataProvider = ({children})=>{
    const [fromDate , setFromDate]= useState('')
    const [toDate , setToDate]= useState('')
    return (
      <DataContext.Provider value={{fromDate , setFromDate , toDate , setToDate}}>
{children}
      </DataContext.Provider>
    )
}

export {DataContext , DataProvider}