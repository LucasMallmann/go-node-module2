module.exports = (req, res, next) => {
  if (req.session.user.provider === true) {
    return next()
  }
  return res.redirect('/app/dashboard')
}