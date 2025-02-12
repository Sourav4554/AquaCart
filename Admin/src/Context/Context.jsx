import React, { createContext, useEffect, useState } from 'react'

export const Materials=createContext(null)
const Context = ({children}) => {
    //backend url
    const BackendUrl='http://localhost:4000'
    //manage state of the token
    const[token,createToken]=useState('');
    //manage the visibility of loginpage
    const [showLogin, setShowLogin] = useState(false);
    const requirements={
    BackendUrl,
    token,
    createToken,
    showLogin,
    setShowLogin
    }

    useEffect(()=>{
    const loadData=async()=>{
        if(sessionStorage.getItem('token')){
            setShowLogin(true)
            }
    }
    loadData()
    },[])
  return (

     <Materials.Provider value={requirements}>
       {children}
     </Materials.Provider>
  )
}

export default Context