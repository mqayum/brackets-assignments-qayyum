const authorizeTo = (...systemRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!systemRoles.includes(user?.role)) {
        return res.status(401).json({
          message: "You're unauthorized to do this action",
        });
      }

      next();
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "INTERNAL SERVER ERROR",
      });
    }
  };
};

module.exports = { authorizeTo };
