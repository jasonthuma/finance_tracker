exports.validateTransaction = (req, res, next) => {
  req.check("category", "Category must be selected").notEmpty();
  req
    .check("description", "Description must be less than 255 characters")
    .isLength({ min: 1, max: 255 });

  //Check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  //Proceed to next middleware
  next();
};
