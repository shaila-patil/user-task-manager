// Initial state for the filters slice
const initialState = {
  status: "all",
  userId: null,
};

// Reducer function to handle filter-related actions
const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_STATUS":
      return { ...state, status: action.payload };

    case "FILTER_USER":
      return { ...state, userId: action.payload };

    default:
      return state;
  }
};

export default filtersReducer;
