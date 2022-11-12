const whitelistMiddleware = (req, res, next) => {
  const condition = false;

  if (condition) {
    res.status(401).json({
      msg: "Unauhtorized",
    });
  } else {
    next();
  }
};

module.exports = whitelistMiddleware;
