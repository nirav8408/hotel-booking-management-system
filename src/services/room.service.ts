import { roomRepositories } from "../repositories/room.respositories.js";

export const roomService={
    findRoomTypes:async(roomObj:any)=>{
        return  await roomRepositories.fetchRoomTypes(roomObj)
    }
}