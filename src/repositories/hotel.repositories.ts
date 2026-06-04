
import conn from '../config/db.js'
import type { IHotel } from '../model/hotel.model.js'

const hotelRepositories={
   findHotels: async function findHotels(params:any) {


    const [rows]=await (await conn).execute('select * from hotels where city=?',[params.city])

    return rows as IHotel[]

},


}
export default hotelRepositories