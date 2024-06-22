import axios from "axios";

const baseUrl = "http://192.168.1.35:5000";

export const registerUser = (values, showSnackBar) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    // console.log(values);
    const response = await axios.post(`${baseUrl}/api/user/signup`, values);
    showSnackBar(response.data.message, "success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    showSnackBar(error.response.data.message, "error");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const LoginUser = (values, showSnackBar) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(`${baseUrl}/api/user/login`, values);
    showSnackBar(response.data.message, "success");
    localStorage.setItem("user", response.data.token); // Store the token as-is

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    showSnackBar(error.response.data.message, "error");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${baseUrl}/api/user/fetchAllUser`);
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
