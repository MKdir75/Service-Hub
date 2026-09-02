import api from "./api";

export const getProviderDashboard = async () => {
  const response = await api.get(
    "/dashboard/provider"
  );

  return response.data;
};

