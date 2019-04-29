const { Appointment } = require('../models')

class ProviderController {
  async index(req, res) {
    const { id } = req.session.user
    const appointments = await Appointment.findAll({
      where: {
        provider_id: id
      }
    })

    return res.render('provider/index', { appointments })
  }
}

module.exports = new ProviderController()