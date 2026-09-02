const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "ServiceHub API is running",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  healthCheck,
};