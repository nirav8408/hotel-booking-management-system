import hotelRepositories from "../repositories/hotel.repositories.js";


export const hotelservice={
    gethotel: async (params:any)=>{
        return await hotelRepositories.findHotels(params)
    }
}

