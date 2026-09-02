const Service = require("../models/Service");
const ApiError = require("../utils/apiError");

const {
  uploadToS3,
  getS3SignedUrl,
} = require("../config/aws");

const createService = async ({
  data,
  providerId,
  image,
}) => {
  let imageKey = "";

  if (image) {
    const uploadedImage = await uploadToS3(image);

    imageKey = uploadedImage.key;
  }

  const service = await Service.create({
    ...data,
    provider: providerId,
    image: "",
    imageKey,
  });

  if (service.imageKey) {
    service.image = await getS3SignedUrl(
      service.imageKey
    );
  }

  return service;
};

const getAllServices = async (queryParams) => {
  const {
    search,
    category,
    location,
    minPrice,
    maxPrice,
    sort,
  } = queryParams;

  const filter = {
    isActive: true,
  };

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  let sortOption = {
    createdAt: -1,
  };

  if (sort === "price-low") {
    sortOption = {
      price: 1,
    };
  }

  if (sort === "price-high") {
    sortOption = {
      price: -1,
    };
  }

  if (sort === "rating") {
    sortOption = {
      rating: -1,
    };
  }

  const services = await Service.find(filter)
    .populate(
      "provider",
      "name email phone avatar"
    )
    .sort(sortOption);

  const servicesWithImages = await Promise.all(
    services.map(async (service) => {
      if (service.imageKey) {
        service.image =
          await getS3SignedUrl(
            service.imageKey
          );
      }

      return service;
    })
  );

  return servicesWithImages;
};

const getMyServices = async (providerId) => {
  const services = await Service.find({
    provider: providerId,
  })
    .populate(
      "provider",
      "name email phone avatar"
    )
    .sort({
      createdAt: -1,
    });

  const servicesWithImages = await Promise.all(
    services.map(async (service) => {
      if (service.imageKey) {
        service.image =
          await getS3SignedUrl(
            service.imageKey
          );
      }

      return service;
    })
  );

  return servicesWithImages;
};

const getServiceById = async (serviceId) => {
  const service = await Service.findById(
    serviceId
  ).populate(
    "provider",
    "name email phone avatar"
  );

  if (!service) {
    throw new ApiError(
      404,
      "Service not found"
    );
  }

  if (service.imageKey) {
    service.image =
      await getS3SignedUrl(
        service.imageKey
      );
  }

  return service;
};

const updateService = async (
  serviceId,
  providerId,
  data,
  image
) => {
  const service = await Service.findById(
    serviceId
  );

  if (!service) {
    throw new ApiError(
      404,
      "Service not found"
    );
  }

  if (
    service.provider.toString() !==
    providerId.toString()
  ) {
    throw new ApiError(
      403,
      "You can only update your own service"
    );
  }

  if (image) {
    const uploadedImage =
      await uploadToS3(image);

    service.imageKey =
      uploadedImage.key;

    service.image = "";
  }

  Object.assign(service, data);

  await service.save();

  if (service.imageKey) {
    service.image =
      await getS3SignedUrl(
        service.imageKey
      );
  }

  return service;
};

const deleteService = async (
  serviceId,
  providerId
) => {
  const service = await Service.findById(
    serviceId
  );

  if (!service) {
    throw new ApiError(
      404,
      "Service not found"
    );
  }

  if (
    service.provider.toString() !==
    providerId.toString()
  ) {
    throw new ApiError(
      403,
      "You can only delete your own service"
    );
  }

  await service.deleteOne();

  return {
    message:
      "Service deleted successfully",
  };
};

module.exports = {
  createService,
  getAllServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
};