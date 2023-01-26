const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      // error.message = "Missing required field";
      next(error);
    }
    next();
  };
};

module.exports = validation;
