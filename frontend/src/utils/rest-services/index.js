import { useDispatch } from "react-redux";
import { axiosInstance, axiosMultiPartInstance } from "./config";

export const controllerName = {
  customer: `/Customer`,
  admin: `/Admin`,
  payment: `/Payment`,
  api: `/api`,
};
export const endpoints = {
  login: `${controllerName.api}/login`,
  register: `${controllerName.api}/register`,
  orders: `${controllerName.api}/order/orders`,
  orderUpdate: `${controllerName.api}/order/update`,
  users: `${controllerName.api}/user/users`,
  blackListUser: `${controllerName.api}/user/blacklist`,
  getAllGames: `${controllerName.api}/game/games`,
  createNewGame: `${controllerName.api}/game/create`,
  getAllComplain: `${controllerName.api}/complain/complains`,
  getAllGear: `${controllerName.api}/game/gears`,
  setFavourite: `${controllerName.api}/event/favourite`,
  getSingleProduct: `${controllerName.api}/game`,
  addReview: `${controllerName.api}/game/review`,
  getUserOrders: `${controllerName.api}/user/myorders`,
  getAllStats: `${controllerName.api}/user/getStats`,
  createOrder: `${controllerName.api}/order/create`,
  deleteReview: `${controllerName.api}/game/review`,
  getFavourite: `${controllerName.api}/event/myFavourite`,
  getUserData: `${controllerName.api}/user/profile`,
  createNewEvent: `${controllerName.api}/event/create`,
};

export const performLogin = async (payloadObject) => {
  try {
    return (await axiosInstance.post(`${endpoints.login}`, payloadObject)).data;
  } catch (error) {
    alert("Login Failed, Please check your credentials");
    return error;
  }
};

export const registerUser = async (payloadObject) => {
  try {
    return (await axiosInstance.post(`${endpoints.register}`, payloadObject))
      .data;
  } catch (error) {
    alert("Cannot Register User, Please check your credentials");
    console.log(error);
  }
};
export const getUserData = async () => {
  try {
    return (await axiosInstance.get(`${endpoints.getUserData}`)).data;
  } catch (error) {
    return error;
  }
};
export const getAllGames = async () => {
  try {
    return (await axiosInstance.get(`${endpoints.getAllGames}`)).data;
  } catch (error) {
    return error;
  }
};
export const getAllStats = async () => {
  try {
    return (await axiosInstance.get(`${endpoints.getAllStats}`)).data;
  } catch (error) {
    return error;
  }
};

export const getAllOrders = async () => {
  try {
    return (await axiosInstance.get(`${endpoints.orders}`)).data;
  } catch (error) {
    return error;
  }
};

export const updateStatus = async (id, status) => {
  try {
    return (
      await axiosInstance.put(`${endpoints.orderUpdate}/${id}`, { status })
    ).data;
  } catch (error) {
    return error;
  }
};
export const createNewGame = async (data) => {
  try {
    return await (
      await axiosMultiPartInstance.post(`${endpoints.createNewGame}`, data)
    ).data;
  } catch (error) {
    return error;
  }
};
export const createNewEvent = async (data) => {
  console.log(data, "data here");
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("duration", data.duration);
    formData.append("eventTime", data.eventTime);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("oneTime", data.oneTime);
    formData.append("totalLimit", data.totalLimit);
    return await (
      await axiosMultiPartInstance.post(`${endpoints.createNewEvent}`, formData)
    ).data;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (data) => {
  try {
    return await (
      await axiosInstance.post(`${endpoints.createOrder}`, data)
    ).data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    return (await axiosInstance.get(`${endpoints.users}`)).data;
  } catch (error) {
    return error;
  }
};

export const blackListUser = async (value, id) => {
  try {
    return (
      await axiosInstance.post(`${endpoints.blackListUser}?value=${value}`, {
        id,
      })
    ).data;
  } catch (error) {
    return error;
  }
};
export const getAllComplains = async () => {
  try {
    return await (
      await axiosInstance.get(`${endpoints.getAllComplain}`)
    ).data;
  } catch (error) {
    return error;
  }
};

export const getAllGears = async () => {
  try {
    return await (
      await axiosInstance.get(`${endpoints.getAllGear}`)
    ).data;
  } catch (error) {
    return error;
  }
};

export const setFavourite = async (id, value) => {
  try {
    return await (
      await axiosInstance.put(`${endpoints.setFavourite}/${id}`, {
        value,
      })
    ).data;
  } catch (error) {
    return error;
  }
};

export const getSingleProduct = async (id) => {
  try {
    return await (
      await axiosInstance.get(`${endpoints.getSingleProduct}/${id}`)
    ).data;
  } catch (error) {
    return error;
  }
};

export const addReview = async (id, data) => {
  try {
    return await (
      await axiosInstance.put(`${endpoints.addReview}/${id}`, data)
    ).data;
  } catch (error) {
    return error;
  }
};

export const getUserOrders = async () => {
  try {
    return await (
      await axiosMultiPartInstance.get(`${endpoints.getUserOrders}`)
    ).data;
  } catch (error) {
    return error;
  }
};

export const deleteReview = async (id, productId) => {
  try {
    return await (
      await axiosMultiPartInstance.delete(
        `${endpoints.deleteReview}/${productId}/${id}`
      )
    ).data;
  } catch (error) {
    return error;
  }
};

export const getFavourite = async () => {
  try {
    return await await axiosInstance.get(`${endpoints.getFavourite}`);
  } catch (error) {
    return error;
  }
};
