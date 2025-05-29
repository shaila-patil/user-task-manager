import axios from "axios";

// Action creators for fetching tasks, toggling completion, adding, and deleting tasks

export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: "FETCH_TASK" });
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    dispatch({ type: "TASKS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "TASKS_FAIL", payload: error.message });
  }
};

export const toggleTask = (taskId) => ({
  type: "TOGGLE_TASK",
  payload: taskId,
});

export const addTask = (task) => (dispatch) => {
  dispatch({ type: "ADD_TASK", payload: task });
};

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId,
});
