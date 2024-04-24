const dbPool = require("../config/db.js");;


const createNewReview = (body) => {
    const SQLQuery = `INSERT INTO hotel_review (front_desk, restaurant, kebersihan_kamar, fasilitas_kamar, concierge, pusat_kebugaran, layanan_kamar, message , total, category, email, hotel_id, review_date, type) VALUES ('${body.front_desk}', '${body.restaurant}', '${body.kebersihan_kamar}', '${body.fasilitas_kamar}', '${body.concierge}', '${body.pusat_kebugaran}', '${body.layanan_kamar}', '${body.message}', '${body.total}', '${body.category}', '${body.email}', '${body.hotel_id}','${body.review_date}', '${body.type}')`;
    return dbPool.execute(SQLQuery);
}

const getTotalRowReview = (id, year) => {
    const SQLQuery = `SELECT COUNT (*) AS total_review FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}'`
    return dbPool.execute(SQLQuery);
}

const getReviewById = (id)=> {
    const SQLQuery = `SELECT * FROM hotel_review WHERE id='${id}'`;
    return dbPool.execute(SQLQuery);
}

const getTotalReviewGroupedByCategory = (hotel_id, year) => {
    const SQLQuery = `SELECT category, COUNT(*) AS total_rows FROM hotel_review WHERE hotel_id='${hotel_id}' AND YEAR(review_date)='${year}' GROUP BY category`;
    return dbPool.execute(SQLQuery);
}

const getTotalSubject = (hotel_id, year) => {
    const SQLQuery = `SELECT 
    SUM(IFNULL(staff, 0)) AS staff,
    SUM(IFNULL(restaurant, 0)) AS restaurant,
    SUM(IFNULL(clean, 0)) AS clean,
    SUM(IFNULL(facilities, 0)) AS facilities,
    SUM(IFNULL(services, 0)) AS services, 
    SUM(IFNULL(location, 0)) AS location, 
    SUM(IFNULL(value, 0)) AS value FROM hotel_review WHERE hotel_id='${hotel_id}' AND YEAR(review_date)='${year}'`;
    return dbPool.execute(SQLQuery);
}

const getTotalSubjectByMonth = (hotel_id, year, month) => {
    const SQLQuery = `SELECT 
    SUM(IFNULL(staff, 0)) AS staff,
    SUM(IFNULL(restaurant, 0)) AS restaurant,
    SUM(IFNULL(clean, 0)) AS clean,
    SUM(IFNULL(facilities, 0)) AS facilities,
    SUM(IFNULL(services, 0)) AS services, 
    SUM(IFNULL(location, 0)) AS location, 
    SUM(IFNULL(value, 0)) AS value 
FROM 
    hotel_review 
WHERE 
    hotel_id='${hotel_id}' 
    AND YEAR(review_date)='${year}' 
    AND MONTH(review_date)='${month}'`;
    return dbPool.execute(SQLQuery);
}

const getTotalSubjectByRange = (hotel_id, start, end) => {
    const SQLQuery = `SELECT 
    SUM(IFNULL(staff, 0)) AS staff,
    SUM(IFNULL(restaurant, 0)) AS restaurant,
    SUM(IFNULL(clean, 0)) AS clean,
    SUM(IFNULL(facilities, 0)) AS facilities,
    SUM(IFNULL(services, 0)) AS services, 
    SUM(IFNULL(location, 0)) AS location, 
    SUM(IFNULL(value, 0)) AS value 
    FROM 
    hotel_review 
    WHERE 
    hotel_id='${hotel_id}' 
    AND review_date BETWEEN '${start}' AND '${end}'`;
    return dbPool.execute(SQLQuery);
}

const listRevewByHotelId = (id) =>{
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${id}' ORDER BY id DESC LIMIT 200`;
    return dbPool.execute(SQLQuery);
}

const listReviewByMonth = (hotel_id, month, year) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${hotel_id}' AND MONTH(review_date)='${month}' AND YEAR(review_date)='${year}' ORDER BY id DESC`;
    return dbPool.execute(SQLQuery);
}

const listReviewByRange = (hotel_id, start, end) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${hotel_id}' AND review_date BETWEEN '${start}' AND '${end}' ORDER BY id DESC`;
    return dbPool.execute(SQLQuery);
}

const listReviewByStatus = (hotel_id, status) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${hotel_id}' AND status_review='${status}' ORDER BY id DESC LIMIT 500`;
    return dbPool.execute(SQLQuery);
}

const exportListReviewByHotelId = (id, year) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${id}' AND YEAR(review_date)='${year}' ORDER BY id DESC LIMIT 6000`;
    return dbPool.execute(SQLQuery);
}

const listReviewByFullAndType = (hotel_id, type) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${hotel_id}' AND type IN ('full', '${type}') ORDER BY id DESC LIMIT 200`;
    return dbPool.execute(SQLQuery);
}

const listReviewByFullAndTypeMonthly = (hotel_id, type, year,month) => {
    const SQLQuery = `SELECT * FROM hotel_review WHERE hotel_id='${hotel_id}' AND type IN ('full', '${type}') AND YEAR(review_date)='${year}' AND MONTH(review_date)='${month}' ORDER BY id DESC LIMIT 1000`;
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

const getHighest = (month,year) => {
    const SQLQuery= `SELECT hotel_id, SUM(total) AS total_point
    FROM hotel_review
    WHERE MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
    GROUP BY hotel_id`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotels = (hotel_id, month, year) => {
    const SQLQuery = ` SELECT SUM(total) AS total_point
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotelsReviewsRow = (hotel_id, month, year) => {
    const SQLQuery = ` SELECT COUNT(*) AS jumlah_review
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotelsByPerfect = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_perfect
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND status_review = 'perfect'`
      return dbPool.execute(SQLQuery);
    }
const getCurrentHotelsByCukup = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_cukup
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
    AND status_review = 'cukup'`
    return dbPool.execute(SQLQuery);
}
const getCurrentHotelsByBuruk = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_buruk
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
    AND status_review = 'buruk'`
    return dbPool.execute(SQLQuery);
}
const getStaffWithNoZeroValueMonthly = (hotel_id, month, year)  => {
    const SQLQuery = ` SELECT COUNT(*) AS jumlah_staff_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND staff <> '0'`;
    return dbPool.execute(SQLQuery);
}

const getStaffTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(staff) AS total_nilai_staff
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getServicesWithNoZeroValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_services_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND services <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getServicesTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(services) AS total_nilai_services
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getFacilitiesWithNoZeroValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_facilities_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND facilities <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getFacilitiesTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(facilities) AS total_nilai_facilities
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getLocationWithNoZeroValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_location_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND location <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getLocationTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(location) AS total_nilai_location
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getCleanWithNoZeroValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_clean_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND clean <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getCleanTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(clean) AS total_nilai_clean
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getValueWithNoZeroValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_value_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'
      AND value <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getValueTotalValueMonthly = (hotel_id, month, year) => {
    const SQLQuery = `SELECT SUM(value) AS total_nilai_value
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND MONTH(review_date) = '${month}' AND YEAR(review_date) = '${year}'`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotelsByLast = (hotel_id, month, year, date) => {
    const SQLQuery = ` SELECT SUM(total) AS total_point
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotelsReviewsRowByLast = (hotel_id, month, year, date) => {
    const SQLQuery = ` SELECT COUNT(*) AS jumlah_review
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getCurrentHotelsByPerfectByLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_perfect
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND status_review = 'perfect'`
      return dbPool.execute(SQLQuery);
    }
const getCurrentHotelsByCukupByLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_cukup
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
    AND status_review = 'cukup'`
    return dbPool.execute(SQLQuery);
}
const getCurrentHotelsByBurukByLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_buruk
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
    AND status_review = 'buruk'`
    return dbPool.execute(SQLQuery);
}

const getStaffWithNoZeroValueLast = (hotel_id, month, year, date)  => {
    const SQLQuery = ` SELECT COUNT(*) AS jumlah_staff_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND staff <> '0'`;
    return dbPool.execute(SQLQuery);
}

const getStaffTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(staff) AS total_nilai_staff
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getServicesWithNoZeroValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_services_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND services <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getServicesTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(services) AS total_nilai_services
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getFacilitiesWithNoZeroValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_facilities_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND facilities <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getFacilitiesTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(facilities) AS total_nilai_facilities
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getLocationWithNoZeroValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_location_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND location <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getLocationTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(location) AS total_nilai_location
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getCleanWithNoZeroValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_clean_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND clean <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getCleanTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(clean) AS total_nilai_clean
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const getValueWithNoZeroValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT COUNT(*) AS jumlah_value_tidak_nol
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'
      AND value <> '0'`;
      return dbPool.execute(SQLQuery);
}

const getValueTotalValueLast = (hotel_id, month, year, date) => {
    const SQLQuery = `SELECT SUM(value) AS total_nilai_value
    FROM hotel_review
    WHERE hotel_id = '${hotel_id}' AND review_date >= '${year}-${month}-${date}'`;
    return dbPool.execute(SQLQuery);
}

const joinTableReviewAndCategoryToExport = (hotel_id) => {
    const SQLQuery = `SELECT hr.review_date, COUNT(*) AS total_review, rc.name, SUM(IF(hr.status_review = 'buruk', 1, 0)) AS negative_reviews
    FROM hotel_review hr
    JOIN review_category rc ON hr.category = rc.id
    WHERE hr.hotel_id='${hotel_id}' AND hr.review_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY hr.review_date, rc.name`;
    return dbPool.execute(SQLQuery);
}
const tryjoinTableReviewAndCategoryToExport = (hotel_id) => {
    const SQLQuery = `SELECT hr.review_date, COUNT(*) AS total_review, 
    rc.name,
    SUM(IF(hr.status_review = 'buruk', 1, 0)) AS negative_reviews
    FROM hotel_review hr
    JOIN review_category rc ON hr.category = rc.id
    WHERE hr.hotel_id='${hotel_id}' AND hr.review_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY hr.review_date, rc.name`;
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
    getTotalLayananKamarGroupByMonth,
    getReviewById,
    listReviewByFullAndType,
    exportListReviewByHotelId,
    getTotalSubjectByMonth,
    listReviewByFullAndTypeMonthly,
    getTotalSubjectByRange,
    getHighest,
    getCurrentHotels,
    getCurrentHotelsByPerfect,
    getCurrentHotelsByCukup,
    getCurrentHotelsByBuruk,
    getCurrentHotelsReviewsRow,
    getStaffWithNoZeroValueMonthly,
    getStaffTotalValueMonthly,
    getServicesWithNoZeroValueMonthly,
    getServicesTotalValueMonthly,
    getFacilitiesWithNoZeroValueMonthly,
    getFacilitiesTotalValueMonthly,
    getLocationWithNoZeroValueMonthly,
    getLocationTotalValueMonthly,
    getCleanWithNoZeroValueMonthly,
    getCleanTotalValueMonthly,
    getValueWithNoZeroValueMonthly,
    getValueTotalValueMonthly,
    getCurrentHotelsByLast,
    getCurrentHotelsReviewsRowByLast,
    getCurrentHotelsByPerfectByLast,
    getCurrentHotelsByCukupByLast,
    getCurrentHotelsByBurukByLast,
    getStaffWithNoZeroValueLast,
    getStaffTotalValueLast,
    getServicesWithNoZeroValueLast,
    getServicesTotalValueLast,
    getFacilitiesWithNoZeroValueLast,
    getFacilitiesTotalValueLast,
    getLocationWithNoZeroValueLast,
    getLocationTotalValueLast,
    getCleanWithNoZeroValueLast,
    getCleanTotalValueLast,
    getValueWithNoZeroValueLast,
    getValueTotalValueLast,
    listReviewByMonth,
    listReviewByRange,
    listReviewByStatus,
    joinTableReviewAndCategoryToExport,
    tryjoinTableReviewAndCategoryToExport
}