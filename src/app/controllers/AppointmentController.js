const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.providerId)
    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { providerId: provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date: date
    })

    return res.redirect('/')
  }
}

module.exports = new AppointmentController()
