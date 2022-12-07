const mongoose = require("mongoose");
const { APPOINTMENT_STATUS_ENUM } = require("../../config/constants");

const Appointment = require("../schemas/appointment.schema");

const perDayAnalytics = async (userId) => {
  try {
    const aggregationPipeline = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          status: APPOINTMENT_STATUS_ENUM.COMPLETED,
        },
      },
      {
        $addFields: {
          day: {
            $dayOfMonth: "$startTime",
          },
          duration: {
            $dateDiff: {
              startDate: "$startTime",
              endDate: "$endTime",
              unit: "second",
            },
          },
        },
      },
      {
        $group: {
          _id: "$day",
          timeSpent: {
            $sum: "$duration",
          },
        },
      },
      {
        $project: {
          _id: 0,
          day: "$_id",
          timeSpent: 1,
        },
      },
    ];

    const results = await Appointment.aggregate(aggregationPipeline);

    return results;
  } catch (error) {
    throw error;
  }
};
const timeModeAnalytics = async (userId) => {
  try {
    const aggregationPipeline = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          status: APPOINTMENT_STATUS_ENUM.COMPLETED,
        },
      },
      {
        $addFields: {
          endedAtHour: {
            $hour: "$endTime",
          },
          duration: {
            $dateDiff: {
              startDate: "$startTime",
              endDate: "$endTime",
              unit: "second",
            },
          },
        },
      },
      {
        $addFields: {
          timeMode: {
            $cond: [
              {
                $gte: ["$endedAtHour", 12],
              },
              "PM",
              "AM",
            ],
          },
        },
      },
      {
        $group: {
          _id: "$timeMode",
          timeSpent: {
            $sum: "$duration",
          },
        },
      },
      {
        $project: {
          _id: 0,
          timeMode: "$_id",
          timeSpent: 1,
        },
      },
    ];
    const results = await Appointment.aggregate(aggregationPipeline);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { perDayAnalytics, timeModeAnalytics };
