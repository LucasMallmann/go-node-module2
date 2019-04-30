const moment = require('moment')
const { Appointment, User } = require('../models')

class ProviderController {
  async index (req, res) {
    const { id } = req.session.user
    const appointments = await Appointment.findAll({
      where: {
        provider_id: id
      }
    })

    const promises = appointments.map(async appointment => {
      const appointmentDateUTC = moment(appointment.date).format()
      const localDate = moment.utc(appointmentDateUTC).local()
      const user = await User.findByPk(appointment.user_id)

      return {
        day: localDate.format('DD/MM/YY'),
        hour: localDate.format('HH:mm'),
        user,
        appointment: appointment.id
      }
    })

    const providerAppointments = await Promise.all(promises)

    return res.render('provider/index', { providerAppointments })
  }
}

module.exports = new ProviderController()
