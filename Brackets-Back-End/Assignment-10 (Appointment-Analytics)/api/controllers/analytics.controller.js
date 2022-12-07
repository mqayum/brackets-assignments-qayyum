const Analytics = require('../models/analytics.model');

const getTimeSpentPerDay = async (req, res) => {

    const docId = req.params.doctorId;
    const userId = docId ? docId : req.user._id;
    
    try{
        const data = await Analytics.perDayAnalytics(userId);
        res.status(200).json({
            message: "SUCCESS: Data Retrieved Successfully",
            data
        });
    }
    catch(err){
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
    
}
const getTimeSpentByTimeMode = async (req, res) => {
    const userId = req.user._id;
    try{
        const data = await Analytics.timeModeAnalytics(userId);
        res.status(200).json({
            message: "SUCCESS: Data Retrieved Successfully",
            data
        });
    }
    catch(err){
        return res.status(500).json({
            message: "INTERNAL SERVER ERROR"
        })
    }
}

module.exports = { getTimeSpentPerDay, getTimeSpentByTimeMode }