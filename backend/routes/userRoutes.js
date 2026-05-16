import express from 'express'
import { getCurrentUser, updateProfile } from '../controller/userController.js'
import {isAuth} from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
const router=express.Router()
router.get('/getcurrentuser',isAuth,getCurrentUser)
router.post('/profile',isAuth,upload.single("photoUrl"),updateProfile)

export default router