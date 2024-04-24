const reviewModel = require("../model/review.js");
const peringkatModel = require("../model/peringkat.js");


const createNewReview = async(req, res, next) => {
    const {body} = req;
    try {
        await reviewModel.createNewReview(body);
        const [hotel] = await peringkatModel.getPeringkatByHotelId(body.hotel_id);
        const counting = parseInt(hotel[0].total_point) + parseInt(body.total);
        await peringkatModel.updatePeringkatHotel(body.hotel_id, counting);
        res.status(201).json({
            message : "review has been submited successfully !"
        });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const getTotalRowReview = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const year = new Date().getFullYear();
    try {
        const [reviews] = await reviewModel.getTotalRowReview(hotel_id, year);
        res.status(200).json({
            reviews : reviews
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const getTotalReviewGroupByCategory = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const year = new Date().getFullYear();
    try {
        const [total] = await reviewModel.getTotalReviewGroupedByCategory(hotel_id, year);
        res.status(200).json({
            reviews : total
        });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const getTotalSubject = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const year = new Date().getFullYear();
    try {
        const [result] = await reviewModel.getTotalSubject(hotel_id, year);
        const formattedResults = [];
    for (const [key, value] of Object.entries(result[0])) {
        // Melewati kunci "total_rows"
        if (key !== 'total_rows') {
            // Menambahkan objek baru ke dalam array
            formattedResults.push({ column: key, value: value ===  null ? 0 : parseInt(value) });
        }
    }

    res.status(200).json({
        subjects: formattedResults
    });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const getTotalSubjectByMonth = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const month = req.query.month;
    const year = new Date().getFullYear();
    try {
        const [result] = await reviewModel.getTotalSubjectByMonth(hotel_id, year, month);
        const formattedResults = [];
    for (const [key, value] of Object.entries(result[0])) {
        // Melewati kunci "total_rows"
        if (key !== 'total_rows') {
            // Menambahkan objek baru ke dalam array
            formattedResults.push({ column: key, value: value ===  null ? 0 : parseInt(value)  });
        }
    }

    res.status(200).json({
        subjects: formattedResults
    });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}
const getTotalSubjectByRange = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const start = req.query.start;
    const end = req.query.end;
    try {
        const [result] = await reviewModel.getTotalSubjectByRange(hotel_id, start, end);
        const formattedResults = [];
    for (const [key, value] of Object.entries(result[0])) {
        // Melewati kunci "total_rows"
        if (key !== 'total_rows') {
            // Menambahkan objek baru ke dalam array
            formattedResults.push({ column: key, value: value ===  null ? 0 : parseInt(value)  });
        }
    }

    res.status(200).json({
        subjects: formattedResults
    });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const listReviewByHotelId = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    try {
        const [reviews] = await reviewModel.listRevewByHotelId(hotel_id);
        res.status(200).json({
            reviews : reviews
        });
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const listReviewByMonth = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const month = req.query.month;
    const year = new Date().getFullYear();
    try {
        const [reviews] = await reviewModel.listReviewByMonth(hotel_id, month, year);
        res.status(200).json({
            reviews : reviews
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : 'intternal server error !',
            data : error.stack
        })
    }
}

const listReviewByRange = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const start = req.query.start;
    const end = req.query.end;
    try {
        const [reviews] = await reviewModel.listReviewByRange(hotel_id, start, end);
        res.status(200).json({
            reviews : reviews
        })
        
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : 'internal server error !',
            data : error.stack
        })
    }
}

const listReviewByStatus = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const status = req.query.status;
    try {
        const [reviews] = await reviewModel.listReviewByStatus(hotel_id, status);
        res.status(200).json({
            reviews : reviews
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : 'internal server error !',
            data : error.stack
        })
    }
}

const getTotalPointMothly = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const year = new Date().getFullYear();
    try {
        const [result] = await reviewModel.getTotalPointReviewGroupByMonth(hotel_id, year);
        res.status(200).json({
            total_point : result
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const getTotalPointColumnMonthly = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const year = new Date().getFullYear();
    try {
        const [frontDesk] = await reviewModel.getTotalFrontDeskGroupByMonth(hotel_id, year);
        const [restaurant] = await reviewModel.getTotalRestaurantGroupByMonth(hotel_id, year);
        const [kebersihan] = await reviewModel.getTotalKebersihanKamarGroupByMonth(hotel_id, year);
        const [fasilitas] = await reviewModel.getTotalFasilitasKamarGroupByMonth(hotel_id, year);
        const [concierge] = await reviewModel.getTotalConciergeGroupByMonth(hotel_id, year);
        const [kebugaran] = await reviewModel.getTotalPusatKebugaranGroupByMonth(hotel_id, year);
        const [layanan] = await reviewModel.getTotalLayananKamarGroupByMonth(hotel_id, year);

        res.status(200).json({
            front_desk : frontDesk,
            F_and_B : restaurant,
            kebersihan_kamar : kebersihan,
            fasilitas_kamar : fasilitas,
            concierge : concierge,
            pusat_kebugaran : kebugaran,
            layanan_kamar : layanan 
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

const partRiviewByCategory = async(req, res, next) => {
    const {body} = req;
    try {
        res.status(201).json({
            message : "beres bos !"
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}


const getReviewById = async(req, res, next) => {
    const review_id = req.query.review_id;
    try {
        const [review] = await reviewModel.getReviewById(review_id);
        res.status(200).json({
            review : review
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        });
    }
}

const listReviewByFullAndType = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const type = req.query.type;
    try {
        const [data] = await reviewModel.listReviewByFullAndType(hotel_id, type);
        res.status(200).json({
            reviews : data
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : 'internal server error !',
            data : error.stack
        })
    }
}

const listReviewByFullAndTypeMonthly = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const type = req.query.type;
    const month = req.query.month;
    const year = new Date().getFullYear();
    try {
        const [data] = await reviewModel.listReviewByFullAndTypeMonthly(hotel_id, type,  year ,month);
        res.status(200).json({
            reviews : data
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            message : 'internal server error !',
            data : error.stack
        })
    }
}

const getComparationByLast = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const getLast = req.query.days;
    const now = new Date();
    now.setDate(now.getDate() - getLast);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    try {
        const [getTotalReviews] = await reviewModel.getCurrentHotelsReviewsRowByLast(hotel_id, month, year, date);
        
        const [getHotelSaya] = await reviewModel.getCurrentHotelsByLast(hotel_id, month, year, date);

        const countableTotalPoint = getTotalReviews[0].jumlah_review * 10;
        const persentase = (getHotelSaya[0].total_point / countableTotalPoint) * 100;

        let countings = 0;
if(persentase > 100){
    countings = 100
} else if (persentase < 0){
    countings = 0
}
else {
    countings = persentase
}       
    const jumlahReview = getTotalReviews[0].jumlah_review;

    const [reviewPerfect] = await reviewModel.getCurrentHotelsByPerfectByLast(hotel_id, month, year, date);

    const [reviewCukup] = await reviewModel.getCurrentHotelsByCukupByLast(hotel_id, month, year, date);

    const [reviewBuruk] = await reviewModel.getCurrentHotelsByBurukByLast(hotel_id, month, year, date);

    
    const [getStaffWithNoZero] = await reviewModel.getStaffWithNoZeroValueLast(hotel_id, month, year, date);

    const [getStaffTotalValue] = await reviewModel.getStaffTotalValueLast(hotel_id, month, year, date);

    const [getServicesWithNoZero] = await reviewModel.getServicesWithNoZeroValueLast(hotel_id, month, year, date);

    const [getServicesTotalValue] = await reviewModel.getServicesTotalValueLast(hotel_id, month, year, date);

    
    const [getFacilitiesWithNoZero] = await reviewModel.getFacilitiesWithNoZeroValueLast(hotel_id, month, year, date);

    const [getFacilitiesTotalValue] = await reviewModel.getFacilitiesTotalValueLast(hotel_id, month, year, date);
    
    const [getLocationWithNoZero] = await reviewModel.getLocationWithNoZeroValueMonthly(hotel_id, month, year, date);

    const [getLocationTotalValue] = await reviewModel.getLocationTotalValueMonthly(hotel_id, month,  year, date);

    const [getCleanWithNoZero] = await reviewModel.getCleanWithNoZeroValueLast(hotel_id, month, year, date);

    const [getCleanTotalValue] = await reviewModel.getCleanTotalValueLast(hotel_id, month, year, date);

    const [getValueWithNoZero] = await reviewModel.getValueWithNoZeroValueMonthly(hotel_id, month, year, date);

    const [getValueTotalValue] = await reviewModel.getValueTotalValueMonthly(hotel_id, month, year, date);

    const countTableValuePoint = getValueWithNoZero[0].jumlah_value_tidak_nol * 10;

    const persentaseValue = (getValueTotalValue[0].total_nilai_value / countTableValuePoint) * 100;

    const countTableCleanPoint = getCleanWithNoZero[0].jumlah_clean_tidak_nol * 10;

    const persentaseClean = (getCleanTotalValue[0].total_nilai_clean / countTableCleanPoint) * 100;

    const countTableTotalLocationPoint = getLocationWithNoZero[0].jumlah_location_tidak_nol * 10;

    const persentaseLocation = (getLocationTotalValue[0].total_nilai_location / countTableTotalLocationPoint) * 100;
    
    const countTableTotalFacilitiesPoint = getFacilitiesWithNoZero[0].jumlah_facilities_tidak_nol * 10;

    const persentaseFacilities = (getFacilitiesTotalValue[0].total_nilai_facilities / countTableTotalFacilitiesPoint) * 100;
    
    const countTableTotalServicesPoint = getServicesWithNoZero[0].jumlah_services_tidak_nol * 10;

    const persentaseServices = (getServicesTotalValue[0].total_nilai_services / countTableTotalServicesPoint) * 100;

    const countTableTotalStaffPoint = getStaffWithNoZero[0].jumlah_staff_tidak_nol * 10;

    const persentaseStaff = (getStaffTotalValue[0].total_nilai_staff / countTableTotalStaffPoint) * 100;

    const hasilPerfect =  reviewPerfect[0]?.jumlah_perfect;
    const hasilCukup = reviewCukup[0]?.jumlah_cukup;
    const hasilBuruk =  reviewBuruk[0]?.jumlah_buruk;

        res.status(200).json({
            gsi_natural_value : countings,
            global_setisfaction_index : `${countings.toFixed(1)}%`,
            jumlah_review : jumlahReview,
            review_perfect : hasilPerfect,
            review_cukup : hasilCukup,
            review_buruk : hasilBuruk,
            persentase_staff : `${persentaseStaff.toFixed(1)}%`,
            jumlah_review_staff : getStaffWithNoZero[0].jumlah_staff_tidak_nol,
            persentase_services : `${persentaseServices.toFixed(1)}%`,
            jumlah_review_services : getServicesWithNoZero[0].jumlah_services_tidak_nol,
            persentase_facilities : `${persentaseFacilities.toFixed(1)}%`,
            jumlah_review_facilities : getFacilitiesWithNoZero[0].jumlah_facilities_tidak_nol,
            persentase_location : `${persentaseLocation.toFixed(1)}%`,
            jumlah_review_location : getLocationWithNoZero[0].jumlah_location_tidak_nol,
            persentase_clean : `${persentaseClean.toFixed(1)}%`,
            jumlah_review_clean : getCleanWithNoZero[0].jumlah_clean_tidak_nol,
            persentase_value : `${persentaseValue.toFixed(1)}%`,
            jumlah_review_value : getValueWithNoZero[0].jumlah_value_tidak_nol
        })
    } catch (error) {
        res.status(500).json({
            message : 'internal server error !'
        })
    }

}

const getComparation = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    const month = req.query.month;
    const year = new Date().getFullYear();
    try {
        // const [rows] = await reviewModel.getHighest(month, year);
        const [totalReviews] = await reviewModel.getCurrentHotelsReviewsRow(hotel_id, month, year);
//     let maxTotalPoint = 0;
//     let hotelIDTerbaik = null;
// for (const row of rows) {
//   if (row.total_point > maxTotalPoint) {
//     maxTotalPoint = row.total_point;
//     hotelIDTerbaik = row.hotel_id;
//   }
// }
const [hotelSaya] = await reviewModel.getCurrentHotels(hotel_id, month, year);
const countableTotalPoint = totalReviews[0].jumlah_review * 10;
const persentase = (hotelSaya[0].total_point / countableTotalPoint) * 100;

let countings = 0;
if(persentase > 100){
    countings = 100
} else if (persentase < 0){
    countings = 0
}
else {
    countings = persentase
}

const jumlahReview = totalReviews[0].jumlah_review;

const [reviewPerfect] = await reviewModel.getCurrentHotelsByPerfect(hotel_id, month, year);

const [reviewCukup] = await reviewModel.getCurrentHotelsByCukup(hotel_id, month, year);

const [reviewBuruk] = await reviewModel.getCurrentHotelsByBuruk(hotel_id, month, year);

const [getStaffWithNoZero] = await reviewModel.getStaffWithNoZeroValueMonthly(hotel_id, month, year);

const [getStaffTotalValue] = await reviewModel.getStaffTotalValueMonthly(hotel_id, month, year);

const [getServicesWithNoZero] = await reviewModel.getServicesWithNoZeroValueMonthly(hotel_id, month, year);

const [getServicesTotalValue] = await reviewModel.getServicesTotalValueMonthly(hotel_id, month, year);

const [getFacilitiesWithNoZero] = await reviewModel.getFacilitiesWithNoZeroValueMonthly(hotel_id, month, year);

const [getFacilitiesTotalValue] = await reviewModel.getFacilitiesTotalValueMonthly(hotel_id, month, year);

const [getLocationWithNoZero] = await reviewModel.getLocationWithNoZeroValueMonthly(hotel_id, month, year);

const [getLocationTotalValue] = await reviewModel.getLocationTotalValueMonthly(hotel_id, month,  year);

const [getCleanWithNoZero] = await reviewModel.getCleanWithNoZeroValueMonthly(hotel_id, month, year);

const [getCleanTotalValue] = await reviewModel.getCleanTotalValueMonthly(hotel_id, month, year);

const [getValueWithNoZero] = await reviewModel.getValueWithNoZeroValueMonthly(hotel_id, month, year);

const[getValueTotalValue] = await reviewModel.getValueTotalValueMonthly(hotel_id, month, year);

const countTableValuePoint = getValueWithNoZero[0].jumlah_value_tidak_nol * 10;

const persentaseValue = (getValueTotalValue[0].total_nilai_value / countTableValuePoint) * 100;

const countTableCleanPoint = getCleanWithNoZero[0].jumlah_clean_tidak_nol * 10;

const persentaseClean = (getCleanTotalValue[0].total_nilai_clean / countTableCleanPoint) * 100;

const countTableTotalLocationPoint = getLocationWithNoZero[0].jumlah_location_tidak_nol * 10;

const persentaseLocation = (getLocationTotalValue[0].total_nilai_location / countTableTotalLocationPoint) * 100;

const countTableTotalFacilitiesPoint = getFacilitiesWithNoZero[0].jumlah_facilities_tidak_nol * 10;

const persentaseFacilities = (getFacilitiesTotalValue[0].total_nilai_facilities / countTableTotalFacilitiesPoint) * 100;

const countTableTotalServicesPoint = getServicesWithNoZero[0].jumlah_services_tidak_nol * 10;

const persentaseServices = (getServicesTotalValue[0].total_nilai_services / countTableTotalServicesPoint) * 100;

const countTableTotalStaffPoint = getStaffWithNoZero[0].jumlah_staff_tidak_nol * 10;

const persentaseStaff = (getStaffTotalValue[0].total_nilai_staff / countTableTotalStaffPoint) * 100;


const hasilPerfect =  reviewPerfect[0]?.jumlah_perfect;
const hasilCukup = reviewCukup[0]?.jumlah_cukup;
const hasilBuruk =  reviewBuruk[0]?.jumlah_buruk;

res.status(200).json({
    gsi_natural_value : countings,
    global_setisfaction_index : `${countings.toFixed(2)}%`,
    jumlah_review : jumlahReview,
    review_perfect : hasilPerfect,
    review_cukup : hasilCukup,
    review_buruk : hasilBuruk,
    persentase_staff : `${persentaseStaff.toFixed(2)}%`,
    jumlah_review_staff : getStaffWithNoZero[0].jumlah_staff_tidak_nol,
    persentase_services : `${persentaseServices.toFixed(2)}%`,
    jumlah_review_services : getServicesWithNoZero[0].jumlah_services_tidak_nol,
    persentase_facilities : `${persentaseFacilities.toFixed(2)}%`,
    jumlah_review_facilities : getFacilitiesWithNoZero[0].jumlah_facilities_tidak_nol,
    persentase_location : `${persentaseLocation.toFixed(2)}%`,
    jumlah_review_location : getLocationWithNoZero[0].jumlah_location_tidak_nol,
    persentase_clean : `${persentaseClean.toFixed(2)}%`,
    jumlah_review_clean : getCleanWithNoZero[0].jumlah_clean_tidak_nol,
    persentase_value : `${persentaseValue.toFixed(2)}%`,
    jumlah_review_value : getValueWithNoZero[0].jumlah_value_tidak_nol
})
    } catch (error) {
        res.status(500).json({
            message : 'internal server error !',
            data : error.stack
        })
    }
}

module.exports = {
    createNewReview,
    getTotalRowReview,
    getTotalReviewGroupByCategory,
    getTotalSubject,
    listReviewByHotelId,
    getTotalPointMothly,
    getTotalPointColumnMonthly,
    partRiviewByCategory,
    getReviewById,
    listReviewByFullAndType,
    getTotalSubjectByMonth,
    listReviewByFullAndTypeMonthly,
    getTotalSubjectByRange,
    getComparation,
    getComparationByLast,
    listReviewByMonth,
    listReviewByRange,
    listReviewByStatus
}