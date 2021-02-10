const withLogger = httpServerHandler => (req, res) => {
  // Logging
  const date = new Date().toISOString();
  console.log([date, req.method, req.url].join('  '));

  httpServerHandler(req, res);
};

module.exports = withLogger;
