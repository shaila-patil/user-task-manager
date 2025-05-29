// Initial state for the users
const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Reducer function to manage user fetching, success, and failure states
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, loading: true };

    case "USERS_SUCCESS":
      return { list: action.payload, loading: false, error: null };

    case "USERS_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
