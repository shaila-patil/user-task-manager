import axios from "axios";

//Action creator for fetching users
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: "FETCH_USERS" });
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({ type: "USERS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "USERS_FAIL", payload: error.message });
  }
};
