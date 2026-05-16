import express from 'express'
import { createCourse,getPublishedCourses,getCourseById,getCreatorCourse,editCourse,removeCourse, getCreatorById } from '../controller/courseController.js'
import { createLecture,getCourseLecture,editLecture,removeLecture } from '../controller/courseController.js'
import { searchWithAi } from '../controller/searchController.js'
import {isAuth} from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'

const router=express.Router()
// courses
router.post('/create',isAuth,createCourse)
 router.get('/getpublished',getPublishedCourses)
 router.get('/getcreator',isAuth,getCreatorCourse)
 router.get('/getcourse/:courseId',isAuth,getCourseById)
 router.put('/editcourse/:courseId',isAuth,upload.single("thumbnail"),editCourse)
router.delete('/remove/:courseId',isAuth,removeCourse)

// lectures
router.post('/createlecture/:courseId',isAuth,createLecture)
router.get('/courselecture/:courseId',isAuth,getCourseLecture)
router.put('/editlecture/:lectureId',isAuth,upload.single("videoUrl"),editLecture)
router.delete('/removelecture/:lectureId',isAuth,removeLecture)
router.post('/creator',isAuth,getCreatorById)


// for search
router.post('/search',searchWithAi)

export default router