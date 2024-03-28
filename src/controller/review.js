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
            formattedResults.push({ column: key, value: parseInt(value) });
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

module.exports = {
    createNewReview,
    getTotalRowReview,
    getTotalReviewGroupByCategory,
    getTotalSubject,
    listReviewByHotelId,
    getTotalPointMothly,
    getTotalPointColumnMonthly
}