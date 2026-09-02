const asyncHandler = require("../utils/asyncHandler");

const {
  getProviderDashboard,
} = require("../services/dashboardService");

const getProviderDashboardData =
  asyncHandler(async (req, res) => {
    const data = await getProviderDashboard(
      req.user._id
    );

    res.status(200).json({
      success: true,
      data,
    });
  });

module.exports = {
  getProviderDashboardData,
};