import { createContext,useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [edit,setEdit] = useState([])
    const [room,setRoom] = useState([])
    const [teacher,setTeacher] = useState([])
    return <UserContext.Provider value={{edit,setEdit,room,setRoom,teacher,setTeacher}}>{children}</UserContext.Provider>
}