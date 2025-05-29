import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { addTask } from "../actions/taskActions";

const AddTask = ({
  modalOpen,
  handleCloseModal,
  setModalOpen,
  tasks,
  users,
}) => {
  //local states
  const [newTitle, setNewTitle] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newStatus, setNewStatus] = useState("pending");
  const dispatch = useDispatch();

  useEffect(() => {
    setNewTitle("");
    setNewUser("");
    setNewStatus("");
  }, [modalOpen]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };

  //Generate unique id for adding new user
  const generateUniqueId = () => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((task) => task.id)) + 1;
  };

  //Add new task
  const handleAddTask = () => {
    if (!newTitle.trim() || !newUser) return;

    const newTask = {
      id: generateUniqueId(),
      userId: Number(newUser),
      title: newTitle.trim(),
      completed: newStatus === "completed",
    };

    dispatch(addTask(newTask));
    setModalOpen(false);
  };

  return (
    <Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <Typography
              variant="h6"
              component="h2"
              mb={2}
              sx={{ fontWeight: "bold", color: "#413839" }}
            >
              Add New Task
            </Typography>

            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              select
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="" disabled hidden>
                Select user
              </option>
              {users.map((user) => (
                <option key={user.id} value={String(user.id)}>
                  {user.username}
                </option>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </TextField>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddTask}
                disabled={!newTitle.trim() || !newUser}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddTask;
