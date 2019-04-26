const { Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    console.log(appointments)

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .seconds(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(
            appointment => appointment.date.format('HH:mm') === time
          )
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
