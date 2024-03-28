const dbPool = require("../config/db.js");;


const createNewReview = (body) => {
    const SQLQuery = `INSERT INTO hotel_review (front_desk, restaurant, kebersihan_kamar, fasilitas_kamar, concierge, pusat_kebugaran, layanan_kamar, message , total, category, email, hotel_id, review_date) VALUES ('${body.front_desk}', '${body.restaurant}', '${body.kebersihan_kamar}', '${body.fasilitas_kamar}', '${body.concierge}', '${body.pusat_kebugaran}', '${body.layanan_kamar}', '${body.message}', '${body.total}', '${body.category}', '${body.email}', '${body.hotel_id}','${body.review_date}')`;
    return dbPool.execute(SQLQuery);
}

const getTotalRowReview = (id, year) => {
    const SQLQuery = `SELECT COUNT (*) AS total_review FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}'`
    return dbPool.execute(SQLQuery);
}

const getTotalReviewGroupedByCategory = (hotel_id, year) => {
    const SQLQuery = `SELECT category, COUNT(*) AS total_rows FROM hotel_review WHERE hotel_id='${hotel_id}' AND YEAR(review_date)='${year}' GROUP BY category`;
    return dbPool.execute(SQLQuery);
}

const getTotalSubject = (hotel_id, year) => {
    const SQLQuery = `SELECT 
    SUM(IFNULL(front_desk, 0)) AS front_desk,
    SUM(IFNULL(restaurant, 0)) AS F_and_B,
    SUM(IFNULL(kebersihan_kamar, 0)) AS kebersihan_kamar,
    SUM(IFNULL(fasilitas_kamar, 0)) AS fasilitas_kamar,
    SUM(IFNULL(concierge, 0)) AS concierge, 
    SUM(IFNULL(pusat_kebugaran, 0)) AS pusat_kebugaran, 
    SUM(IFNULL(layanan_kamar, 0)) AS layanan_kamar FROM hotel_review WHERE hotel_id='${hotel_id}' AND YEAR(review_date)='${year}'`;
    return dbPool.execute(SQLQuery);
}

const listRevewByHotelId = (id) =>{
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${id}' ORDER BY id DESC LIMIT 200`;
    return dbPool.execute(SQLQuery);
}

const getTotalPointReviewGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan,
    SUM(total) AS total_point
FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
return dbPool.execute(SQLQuery);
}

const getTotalFrontDeskGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(front_desk) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

const getTotalRestaurantGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(restaurant) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

const getTotalKebersihanKamarGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(kebersihan_kamar) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);

}

const getTotalFasilitasKamarGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(fasilitas_kamar) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

const getTotalConciergeGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(concierge) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

const getTotalPusatKebugaranGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(pusat_kebugaran) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

const getTotalLayananKamarGroupByMonth = (id, year) => {
    const SQLQuery = `SELECT DATE_FORMAT(review_date, '%M') AS bulan, SUM(layanan_kamar) AS total_point FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' GROUP BY DATE_FORMAT(review_date, '%Y-%m')`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    createNewReview,
    getTotalRowReview,
    getTotalReviewGroupedByCategory,
    getTotalSubject,
    listRevewByHotelId,
    getTotalPointReviewGroupByMonth,
    getTotalFrontDeskGroupByMonth,
    getTotalKebersihanKamarGroupByMonth,
    getTotalRestaurantGroupByMonth,
    getTotalFasilitasKamarGroupByMonth,
    getTotalConciergeGroupByMonth,
    getTotalPusatKebugaranGroupByMonth,
    getTotalLayananKamarGroupByMonth
}