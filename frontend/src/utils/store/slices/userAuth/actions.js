import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../../localstorage";
const BASE_URL = "http://localhost:8000/api";

// User Login API

const config = {
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: getToken(),
  },
};
config.headers["Authorization"] = getToken();
export const userLoginAction = createAsyncThunk(
  "userAuth/userLoginAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, payload);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

// User Registraion API
export const registerUserAction = createAsyncThunk(
  "userAuth/registerUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, payload);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

//reg with imaghe

// User Registraion API
export const registerImageUserAction = createAsyncThunk(
  "userAuth/registerImageUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("profileImage", payload.image);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append(
        "gender",
        payload?.gender?.charAt(0)?.toUpperCase() + payload?.gender?.slice(1)
      );
      formData.append("name", payload.name);
      formData.append("interests", payload.interests);
      const { data } = await axios.post(`${BASE_URL}/registerImage`, formData);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

//get users

// User Registraion API
export const getUsersAction = createAsyncThunk(
  "userAuth/getUsersAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/users`, config);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const getUserFilterAction = createAsyncThunk(
  "userAuth/getUserFilterAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/filter`, payload);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const getNotificationsAction = createAsyncThunk(
  "userAuth/getNotificationsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/notification/getunseen`,
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const seeNotificationAction = createAsyncThunk(
  "userAuth/seeNotificationAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/notification/seen/${payload}`,
        {},
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const seeAllNotificationsAction = createAsyncThunk(
  "userAuth/seeAllNotificationsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/notification/seenAll`,
        {},
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const getAllEventsAction = createAsyncThunk(
  "userAuth/getAllEventsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/event/get`, config);
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const getSingleEventAction = createAsyncThunk(
  "userAuth/getSingleEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/event/getsingle/${payload}`,
        config,
        config
      );
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const getMyEventsAction = createAsyncThunk(
  "userAuth/getMyEventsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/event/getmyevents`, config);
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const cancelEventAction = createAsyncThunk(
  "userAuth/cancelEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/cancel/${payload}`,
        {},
        config
      );
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const completeEventAction = createAsyncThunk(
  "userAuth/completeEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/complete/${payload}`,
        {},
        config
      );
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventAction = createAsyncThunk(
  "userAuth/deleteEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/event/delete/${payload}`,
        config
      );
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventAction = createAsyncThunk(
  "userAuth/updateEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/update/${payload._id}`,
        { payload },
        config
      );
      console.log("callled", data);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);
export const getEventFilterAction = createAsyncThunk(
  "userAuth/getEventFilterAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/filter`, payload);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const myJoinEventsAction = createAsyncThunk(
  "userAuth/myJoinEventsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/event/getmyjoined`, config);
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const joinEventAction = createAsyncThunk(
  "userAuth/joinEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/join/${payload}`,
        {},
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const acceptEventAction = createAsyncThunk(
  "userAuth/acceptEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/acceptJoin/${payload.id}`,
        {
          data: {
            userId: payload.userId,
          },
        },
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const cancelRequestEventAction = createAsyncThunk(
  "userAuth/cancelRequestEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/event/cancelJoin/${payload._id}`,
        {
          data: {
            userId: payload.userId,
          },
        },
        config
      );
      // toast.success('Congratulation! You are successfully registered!', {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return rejectWithValue(error.message);
    }
  }
);
