const dbPool = require("../config/db.js");

const createNewHotels = (body) => {
    const SQLQuery = `INSERT INTO hotels (name, location, category) VALUES ('${body.name}', '${body.location}', '${body.category}')`;
    return dbPool.execute(SQLQuery).then(res => { 
        const BaseData = JSON.stringify(res);
        const resultData = JSON.parse(BaseData);
        const valueData = resultData[0].insertId;
        return({valueData});

 }).catch(err => {console.log(err)});
}

const listHotels = () => {
    const SQLQuery = `SELECT * FROM hotels ORDER BY id DESC LIMIT 200`
    return dbPool.execute(SQLQuery);
}


const getHotelProfile = (id) => {
    const SQLQuery = `SELECT * FROM hotels WHERE id='${id}'`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    createNewHotels,
    listHotels,
    getHotelProfile
}