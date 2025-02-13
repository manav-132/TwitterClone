import { createContext, useEffect, useReducer, useState } from "react"
import AuthReducer from "./authreducer"
const INITIAL_STATE={
    user:
JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false
}


export const Authcontext=createContext(INITIAL_STATE)
export const Authcontextprovider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    const [profile,setprofile]=useState(false);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
    return (
        <Authcontext.Provider value={{ user:state.user,isFetching:state.isFetching,error:state.error,dispatch,profile,setprofile}}>
            {children}
        </Authcontext.Provider>
    )
}