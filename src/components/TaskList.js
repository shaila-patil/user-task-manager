import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, toggleTask, deleteTask } from "../actions/taskActions";
import { fetchUsers } from "../actions/userActions";
import { filterByStatus, filterByUser } from "../actions/filtersActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Box,
  TextField,
  Button,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTask from "./AddTask";
import SearchIcon from "@mui/icons-material/Search";
const TaskList = () => {
  const dispatch = useDispatch();

  //redux states
  const {
    list: tasks,
    loading: loadingTask,
    error: taskError,
  } = useSelector((state) => state.tasks);
  const {
    list: users,
    loading: loadingUsers,
    error: userError,
  } = useSelector((state) => state.users);
  const { status, userId } = useSelector((state) => state.filters);

  //local states
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const tableHeaderStyle = {
    border: "1px solid #ccc",
    textAlign: "center",
    fontWeight: "bold",
    color: "#413839",
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const user = users.find((user) => user.id === task.userId);
    const username = user?.username?.toLowerCase() || "";

    // Filter tasks according to search query
    const searchMatch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.includes(searchQuery.toLowerCase());

    // Filter tasks according to task status
    const statusMatch =
      status === "all"
        ? true
        : status === "completed"
        ? task.completed === true
        : task.completed === false;

    // Filter task according to username
    const userMatch = userId === null ? true : task.userId === userId;

    return searchMatch && statusMatch && userMatch;
  });
  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const sortedTasks = [...currentTasks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Handlers for filters
  const handleStatusChange = (event) => {
    dispatch(filterByStatus(event.target.value));
    setCurrentPage(1);
  };

  const handleUserChange = (event) => {
    const val = event.target.value === "" ? null : Number(event.target.value);
    dispatch(filterByUser(val));
    setCurrentPage(1);
  };

  //Close add new task modal
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      {(loadingTask || loadingUsers) && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress sx={{ animationDuration: "2s" }} />
        </Box>
      )}

      {(taskError || userError) && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {taskError ? `Task Error: ${taskError}` : `User Error: ${userError}`}
        </Typography>
      )}

      {!loadingTask && !loadingUsers && !userError && tasks.length > 0 && (
        <>
          {/* Filters by task status and user */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
                sx={{ color: "#676767" }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>User</InputLabel>
              <Select
                value={userId !== null ? userId : ""}
                onChange={handleUserChange}
                label="User"
              >
                <MenuItem value="">All Users</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Searchbar and Add new task*/}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              placeholder="Search by title or username"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size="1.1rem" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              sx={{ flexBasis: "150px", flexShrink: 0, fontWeight: "bold" }}
            >
              Add Task
            </Button>
          </Box>

          {/* Tasks table */}
          <Box
            sx={{
              filter: modalOpen ? "blur(4px)" : "none",
              pointerEvents: modalOpen ? "none" : "auto",
            }}
          >
            <TableContainer component={Paper} sx={{ border: "1px solid #ccc" }}>
              <Table sx={{ minWidth: 650 }} aria-label="task list table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f0f4f8" }}>
                    <TableCell
                      sx={{
                        border: "1px solid #ccc",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Done
                    </TableCell>
                    <TableCell sx={tableHeaderStyle}>Task Title</TableCell>
                    <TableCell sx={tableHeaderStyle}>Status</TableCell>
                    <TableCell sx={tableHeaderStyle}>Username</TableCell>
                    <TableCell sx={tableHeaderStyle}>Delete</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sortedTasks.map((task) => {
                    const user = users.find((user) => user.id === task.userId);
                    return (
                      <TableRow
                        key={task.id}
                        sx={{
                          border: "1px solid #ccc",
                          "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                          "&:hover": { backgroundColor: "#e3f2fd" },
                          textAlign: "center",
                        }}
                      >
                        <TableCell
                          padding="checkbox"
                          sx={{ border: "1px solid #ccc", textAlign: "center" }}
                        >
                          <Checkbox
                            checked={task.completed}
                            onChange={() => {
                              if (status === "all") {
                                dispatch(toggleTask(task.id));
                              }
                            }}
                          />
                        </TableCell>

                        <TableCell
                          padding="none"
                          sx={{
                            border: "1px solid #ccc",
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                            color: task.completed ? "gray" : "inherit",
                            padding: "4px 8px",
                          }}
                        >
                          {task.title}
                        </TableCell>

                        <TableCell
                          padding="none"
                          sx={{
                            border: "1px solid #ccc",
                            color: task.completed ? "green" : "orange",
                            fontWeight: "bold",
                            padding: "4px 8px",
                            textAlign: "center",
                          }}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </TableCell>

                        <TableCell
                          padding="none"
                          sx={{
                            border: "1px solid #ccc",
                            textAlign: "center",
                            padding: "4px 8px",
                            textAlign: "center",
                          }}
                        >
                          {user?.username || "Unknown"}
                        </TableCell>

                        <TableCell
                          padding="none"
                          sx={{
                            border: "1px solid #ccc",
                            textAlign: "center",
                            padding: "4px 8px",
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            aria-label="delete"
                            color="error"
                            size="small"
                            onClick={() => dispatch(deleteTask(task.id))}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {sortedTasks.length === 0 && (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body1" color="textSecondary">
                  No results found.
                </Typography>
              </Box>
            )}
            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            )}
          </Box>

          {/* Add Task Modal */}
          <AddTask
            modalOpen={modalOpen}
            handleCloseModal={handleCloseModal}
            setModalOpen={setModalOpen}
            tasks={tasks}
            users={users}
          />
        </>
      )}
    </Box>
  );
};

export default TaskList;
