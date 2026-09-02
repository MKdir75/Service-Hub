const bcrypt = require("bcryptjs");

const User = require("../models/User");
const ApiError = require("../utils/apiError");
const generateToken = require("../utils/generateToken");

const registerUser = async ({
  name,
  email,
  password,
  role,
  phone,
}) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User with this email already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    12
  );

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "customer",
    phone,
  });

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
    token,
  };
};

const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const passwordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatched) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      403,
      "Your account is inactive"
    );
  }

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};