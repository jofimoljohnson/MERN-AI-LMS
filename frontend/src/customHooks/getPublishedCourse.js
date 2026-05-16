
import  { useEffect } from 'react'
import api from '../api/axios'
import {useDispatch} from 'react-redux'
import { setCourseData } from '../redux/courseSlice'

const getPublishedCourse = () => {
    const dispatch=useDispatch()
 useEffect(() => {
    const getCourseData=async()=>{
        try {
          const result=await api.get('/api/course/getpublished')
          console.log(result.data) 
          dispatch(setCourseData(result.data))

        } catch (error) {
          console.log(error)  
        }
    }
    getCourseData()
  
 }, [])
 
}

export default getPublishedCourse