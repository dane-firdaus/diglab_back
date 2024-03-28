const hotelsModel = require("../model/hotels.js");
const peringkatModel = require("../model/peringkat.js");
const jwt = require('jsonwebtoken');


const createHotels = async(req, res, next) => {
    const {body} = req;
    if(!body.name) {
        res.status(400).json({
            message : "mohon masukan nama hotel !"
        })
    } else if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
        ){
            res.status(401).json({
                message:"authorization failed"
            });
        }
        else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedId = jwt.verify(token, 'the-super-strong-secrect');
            try {
             const hotelIds = await hotelsModel.createNewHotels(body);
             const data = {
                hotel_name : body.name,
                hotel_id : hotelIds.valueData
             }
                await peringkatModel.createPeringkatHotel(data);
                res.status(201).json({
                    message : "hotels created successfully !"
                });
            } catch (error) {
                console.log(error.stack);
                res.status(500).json({
                    message : "internal server error !"
                })
            }
        }

}

const listAllHotels = async(req, res, next) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
        ){
            res.status(401).json({
                message:"authorization failed"
            });
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedId = jwt.verify(token, 'the-super-strong-secrect');
            try {
                const [hotels] = await hotelsModel.listHotels();
                res.status(200).json({
                    hotels : hotels,
                    info : decodedId
                })
            } catch (error) {
                console.log(error.stack);
                res.status(500).json({
                    message : "internal server error !",
                    data : error.stack
                })
            }

        }
}

const getHotelById = async(req, res, next) => {
  const hotel_id = req.query.hotel_id;
  try {
    const [hotel] = await hotelsModel.getHotelProfile(hotel_id);
    res.status(200).json({
        hotel : hotel
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
    createHotels,
    listAllHotels,
    getHotelById
}