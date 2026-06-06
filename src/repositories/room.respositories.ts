import conn from "../config/db.js";
import type { RowDataPacket } from "mysql2";
import  type { IRoomType } from "../model/roomtype.model.js";
export const roomRepositories={
    fetchRoomTypes:async(roomObject:any):Promise<IRoomType[]>=>{

        
        const [rows]=await (await conn).execute<(IRoomType & RowDataPacket)[]>(`
SELECT
    rt.room_type_id,
    rt.room_type_name,
    rt.room_base_price,
    rt.max_adults,
    rt.max_children,
    COUNT(r.room_id) AS available_rooms,
    COUNT(r.room_id) * rt.max_adults AS total_adult_capacity,
    COUNT(r.room_id) * rt.max_children AS total_child_capacity,
  rt.room_type_photo_url
FROM room_types rt
JOIN rooms r
    ON rt.room_type_id = r.room_type_id
WHERE rt.hotel_id = ?
  AND r.room_id NOT IN (
      SELECT ra.room_id
      FROM room_availability ra
      JOIN availability_statuses ast
        ON ast.availability_status_id = ra.availability_status_id
      WHERE ra.room_availability_date >=?
        AND ra.room_availability_date < ?
        AND ast.status_name IN ('BOOKED','HELD','MAINTENANCE')
  )
GROUP BY rt.room_type_id
HAVING
    COUNT(r.room_id) * rt.max_adults >= ?
    AND COUNT(r.room_id) * rt.max_children >= ?`,[roomObject.hotel_id,roomObject.checkin_date,roomObject.checkout_date,roomObject.adult,roomObject.child])

    


    const room_type=rows
    const roomtypeids=room_type.map(r=>r.room_type_id)

    const [amenities] :any=await (await conn).execute<(IRoomType & RowDataPacket)[]>(`SELECT
      rta.room_type_id,
      a.amenity_name
  FROM room_type_amenities rta
  JOIN amenities a
      ON a.amenity_id = rta.amenity_id
  WHERE rta.room_type_id IN (${roomtypeids.map(()=>'?').join(',')})`,roomtypeids);


  const amenities_map=new Map()

  amenities.forEach((a:any) => {
    if(!amenities_map.has(a.room_type_id))
    {
        amenities_map.set(a.room_type_id,[])
    }
    amenities_map.get(a.room_type_id).push(a.amenity_name)
    
  });


    const result=room_type.map((room)=>({...room,amenities:amenities_map.get(room.room_type_id) || [] }))

    return result 

    }
}