const asyncHandler = require("../utils/asyncHandler");

const {
  createService,
  getAllServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../services/serviceService");


const create = asyncHandler(
  async (req, res) => {
    const service =
      await createService({
        data: req.body,
        providerId: req.user._id,
        image: req.file,
      });

    res.status(201).json({
      success: true,
      message:
        "Service created successfully",
      data: service,
    });
  }
);

const getAll = asyncHandler(
  async (req, res) => {
    const services =
      await getAllServices(
        req.query
      );

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  }
);

const getMy = asyncHandler(
  async (req, res) => {
    const services =
      await getMyServices(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  }
);

const getOne = asyncHandler(
  async (req, res) => {
    const service =
      await getServiceById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: service,
    });
  }
);

const update = asyncHandler(
  async (req, res) => {
    const service =
      await updateService(
        req.params.id,
        req.user._id,
        req.body,
        req.file
      );

    res.status(200).json({
      success: true,
      message:
        "Service updated successfully",
      data: service,
    });
  }
);

const remove = asyncHandler(
  async (req, res) => {
    const result =
      await deleteService(
        req.params.id,
        req.user._id
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  }
);

module.exports = {
  create,
  getAll,
  getMy,
  getOne,
  update,
  remove,
};