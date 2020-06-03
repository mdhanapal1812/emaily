module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.send(403).send({ error: "Not enough credits !" });
  }
  //There are many middlewares , now if the user is logged in , then he can go to next middleware.
  next();
};
