// Initial state for the tasks
const initialState = {
  list: [],
  loading: false,
  error: null,
};

// Reducer function to manage task-related state
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASK":
      return { ...state, loading: true };

    case "TASKS_SUCCESS":
      return { list: action.payload, loading: false, error: null };

    case "TASKS_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "TOGGLE_TASK":
      return {
        ...state,
        list: state.list.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        list: state.list.filter((task) => task.id !== action.payload),
      };

    case "ADD_TASK":
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    default:
      return state;
  }
};
