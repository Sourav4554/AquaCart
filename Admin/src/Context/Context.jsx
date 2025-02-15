import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
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

 //function for delete fish item
 const deleteFish=async(productId,token)=>{
try {
const {data}=await axios.delete(`${BackendUrl}/api/fish/remove-fish`,{headers:{Authorization:`Bearer ${token}`}, data:{ productId }})
if(data.succes){
toast.success(data.message)
await listFish();
}
else{
toast.error(data.message)
}
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
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
    listFish,
    deleteFish
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