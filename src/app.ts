import express from 'express'
import hotelRouter from './router/hotel.router.js';

const app=express()

app.use('/api/hotels',hotelRouter)

export  default app;