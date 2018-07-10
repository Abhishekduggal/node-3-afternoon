module.exports = function checkForSession(req, res, next) {
  const { session } = req;
  // console.log(session.user);
  if (!session.user) {
    req.session.user = {
      username: "",
      cart: [],
      total: 0.0
    };
  }
  next();
};
