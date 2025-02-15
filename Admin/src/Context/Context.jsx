import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const Materials=createContext(null)
const Context = ({children}) => {
    //backend url
    const BackendUrl='http://localhost:4000'
    //manage state of the token
    const[token,createToken]=useState('');
    //manage the visibility of loginpage
    const [showLogin, setShowLogin] = useState(false);
    //store fish details
    const[fishList,setFishList]=useState({});

    //function for fetching fish
    const listFish=async()=>{
    const {data}=await axios.get(`${BackendUrl}/api/fish/list-fish`,{})
   try {
    if(data.succes){
      setFishList(data.message)
      }
      else{
      console.log(data.message)
      }
   } catch (error) {
    console.log(error)
   }
    }


    const requirements={
    BackendUrl,
    token,
    createToken,
    showLogin,
    setShowLogin,
    fishList,
    setFishList,
    listFish
    }

    useEffect(()=>{
    const loadData=async()=>{
        if(sessionStorage.getItem('token')){
            setShowLogin(true)
            createToken(sessionStorage.getItem('token'))
            await listFish()
            }
    }
    loadData();
    },[])
  return (

     <Materials.Provider value={requirements}>
       {children}
     </Materials.Provider>
  )
}

export default Context