const dbPool = require("../config/db.js");

const createPeringkatHotel = (body) => {
    const SQLQuery = `INSERT INTO peringkat (hotel_name, hotel_id, total_point) VALUES ('${body.hotel_name}', '${body.hotel_id}', '0')`;
    return dbPool.execute(SQLQuery);
}

const updatePeringkatHotel = (hotel_id, value) => {
    const SQLQuery = `UPDATE peringkat SET total_point='${value}' WHERE hotel_id='${hotel_id}'`;
    return dbPool.execute(SQLQuery);
}

const getPeringkatByHotelId = (id) => {
    const SQLQuery = `SELECT * FROM peringkat WHERE hotel_id='${id}'`;
    return dbPool.execute(SQLQuery);
}

const getHighestPeringkatValue = () => {
    const SQLQuery= `SELECT * FROM peringkat ORDER BY total_point DESC LIMIT 10`
    return dbPool.execute(SQLQuery);
}

module.exports = {
    createPeringkatHotel,
    updatePeringkatHotel,
    getPeringkatByHotelId,
    getHighestPeringkatValue
}