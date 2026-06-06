import express, { urlencoded } from 'express'
import hotelRouter from './router/hotel.router.js';
import roomRouter from './router/room.router.js';
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/hotels',hotelRouter)
app.use("/api/rooms",roomRouter)
export  default app;