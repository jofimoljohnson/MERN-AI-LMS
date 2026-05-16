import express from 'express'
import { createReview,getReviews } from '../controller/reviewController.js'
import { isAuth } from '../middleware/isAuth.js'

const router=express.Router()
router.post('/createreview',isAuth,createReview)
router.get('/getreview',getReviews)

export default router