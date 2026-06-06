import type { Request, Response } from "express";
import { roomService } from "../services/room.service.js";

export const roomController={
    handleRoomTypes:async(req:Request,res:Response)=>{
        try{

            const {hotel_id,checkin_date,checkout_date,adult,child}=req.body

            const roomObj={
                hotel_id:hotel_id,
                checkin_date:checkin_date,
                checkout_date:checkout_date,
                adult:adult,
                child:child
            }


            const roomTypeData=await roomService.findRoomTypes(roomObj)

             res.json({sucess:true,data:roomTypeData})

        }
        catch(err)
        {
            console.log(err)
            res.json({success:false,message:'some thing went wrong'})
        }
    }
}