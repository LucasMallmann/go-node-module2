module.exports = (req, res, next) => {
  // The session is ALWAYS initiallized
  if (req.session && !req.session.user) {
    return next()
  }

  // If a user exists, rediret to the dasboard
  return res.redirect('/app/dashboard')
}
