//Action creators for filtering records by status and username

export const filterByStatus = (status) => ({
  type: "FILTER_STATUS",
  payload: status,
});

export const filterByUser = (userId) => ({
  type: "FILTER_USER",
  payload: userId,
});
