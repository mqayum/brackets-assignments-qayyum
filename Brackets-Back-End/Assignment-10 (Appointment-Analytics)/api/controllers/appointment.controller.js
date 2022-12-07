const Appointment = require('../models/appointment.model')
const {APPOINTMENT_STATUS_ENUM} = require('../../config/constants');

const scheduleAppointment = async (req, res) => {
  try {
    const appointment = req.body
    appointment.status = APPOINTMENT_STATUS_ENUM.SCHEDULED;

    const newAppointment = await Appointment.scheduleAppointment(appointment)

    res.status(201).json({
      message: 'SUCCESS: Appointment Scheduled',
      newAppointment
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: "INTERNAL SERVER ERROR"
    })
  }
}

const updateAppointment = async (req, res) => {
  try {
    const { status } = req.body

    const { appointmentId } = req.params

    const updatedAppointment = await Appointment.updateAppointment(appointmentId, { status })

    res.status(200).json({
      message: "SUCCESS: Appointment Status Updated to: "+updatedAppointment.status,
      updatedAppointment
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      error: "INTERNAL SERVER ERROR"
    })
  }
}
const endAppointment = async (req, res) => {
    try {
  
      const { appointmentId } = req.params
  
      const updatedAppointment = await Appointment.updateAppointment(appointmentId, 
        { 
            endTime: new Date(),
            status:  APPOINTMENT_STATUS_ENUM.COMPLETED
        })
  
      res.status(200).json({
        message: "SUCCESS: Appointment Ended at : "+updatedAppointment.endTime,
        updatedAppointment
      })
    } catch (error) {
      console.log(error)
  
      res.status(500).json({
        error: "INTERNAL SERVER ERROR"
      })
    }
  }

module.exports = { scheduleAppointment, endAppointment, updateAppointment }
