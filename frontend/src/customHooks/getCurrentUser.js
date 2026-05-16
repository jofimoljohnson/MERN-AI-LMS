import { useEffect } from "react"
import api from '../api/axios'
import {useDispatch} from 'react-redux'
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
    const dispatch=useDispatch()

  useEffect(() => {
    
  const fetchUser=async()=>{
    try {
    const result=await api.get('/api/user/getcurrentuser') 
    dispatch(setUserData(result.data))

    } catch (error) {
        console.log(error) 
        dispatch(setUserData(null))
    }
  }
  fetchUser()
  },[])
  
}

export default getCurrentUser