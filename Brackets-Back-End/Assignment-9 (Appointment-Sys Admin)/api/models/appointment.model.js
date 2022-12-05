const Appointment = require('../schemas/appointment.schema')

const scheduleAppointment = async appointment => {
  try {
    const newAppointment = new Appointment(appointment)

    return await newAppointment.save()
  } catch (error) {
    throw error
  }
}

const updateAppointment = async (appointmentId, data) => {
  try {
    const newAppointment = Appointment.findByIdAndUpdate(appointmentId, data,
        { new: true }
    )

    return newAppointment
  } catch (error) {
    throw error
  }
}

module.exports = { scheduleAppointment, updateAppointment }
