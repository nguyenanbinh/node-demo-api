module.exports = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(next); // Automatically catch errors and pass to the next middleware (error handler)
    };
  };
  