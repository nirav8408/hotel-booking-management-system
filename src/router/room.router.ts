import { Router } from "express";
import { roomController } from "../controllers/room.controller.js";


const  roomRouter=Router()

roomRouter.post("/getRoomTypes",roomController.handleRoomTypes)

export default  roomRouter