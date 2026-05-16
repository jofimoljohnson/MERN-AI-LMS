import express from 'express'
import { RazorpayOrder,verifyPayment } from '../controller/paymentConroller.js'

const router=express.Router()

router.post('/razorpay-order',RazorpayOrder)
router.post('/verifypayment',verifyPayment)
export default router