import express from 'express'
import { Router } from 'express'
import hotelController from '../controllers/hotel.controller.js'

const hotelRouter=Router()

hotelRouter.post("/getAllHotels",hotelController.getHotels)

export default hotelRouter