import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import api from "../api/axios"
import { setCreatorCourseData } from "../redux/courseSlice"


const getCreatorCourse = () => {
    const dispatch=useDispatch()
    const {userData}=useSelector((state)=>state.user)
  return (
  useEffect(() => {
   const creatorCourses=async()=>{
    try {
        const result=await api.get('/api/course/getcreator')
        console.log(result.data)
        dispatch(setCreatorCourseData(result.data))
    } catch (error) {
        console.log(error)
    }
   }
   creatorCourses()
  }, [userData])
  
  )
}

export default getCreatorCourse