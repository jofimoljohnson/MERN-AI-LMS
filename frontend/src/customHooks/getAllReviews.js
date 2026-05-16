
import  { useEffect } from 'react'
import api from '../api/axios'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'

const getAllReviews = () => {
    const dispatch=useDispatch()

 useEffect(() => {

const allReviews=async()=>{
    try {
     const result=await api.get('/api/review/getreview')   
     console.log(result.data)
     dispatch(setReviewData(result.data))
    } catch (error) {
      console.log(error)  
    }
}
allReviews()
 },[])
 
}

export default getAllReviews