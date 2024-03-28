const dbPool = require("../config/db.js");



const registerNewUser = (body, hashedPassword) => {
    const SQLQuery = `INSERT INTO users (fullname, email, password, role_id, hotel_id) VALUES ('${body.fullname}', '${body.email}', '${hashedPassword}', '${body.role_id}', '${body.hotel_id}')`;
    return dbPool.execute(SQLQuery);
}

const checkUsersByEmail = (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email='${email}'`;
    return dbPool.execute(SQLQuery);
}

const listUsers = () => {
    const SQLQuery = `SELECT * FROM users ORDER BY id DESC LIMIT 200`
    return dbPool.execute(SQLQuery);
}
const listUsersByHotelId = (id) => {
    const SQLQuery = `SELECT * FROM users WHERE hotel_id='${id}' ORDER BY id DESC LIMIT 200`
    return dbPool.execute(SQLQuery);
}



module.exports = {
    registerNewUser,
    checkUsersByEmail,
    listUsers,
    listUsersByHotelId
}