import type { Request, Response } from "express";
import { hotelservice } from "../services/hotel.service.js";



const hotelController={

    getHotels:async function getHotels(req:Request,res:Response)
    {   
        try
        {

            const city=req.body.city

            console.log(city)
            const hotels=await hotelservice.gethotel(city);
            console.log(hotels)
            res.status(200).json({sucess:true,data:hotels})


        }
        catch(err)
        {
            console.log(err)
            res.status(500).json({success:false,message:'something wrong'})
        }
    }
}

export default hotelController