const peringkatModel = require("../model/peringkat.js");


const getHighestPeringkatValue = async(req, res, next) => {
    try {
        const [highest] = await peringkatModel.getHighestPeringkatValue();
        res.status(200).json({
            peringkat : highest
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "internal server error !",
            data : error.stack
        })
    }
}

module.exports = {
    getHighestPeringkatValue
}