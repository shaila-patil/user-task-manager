import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <Container>
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
          borderBottom: "2px solid #1976d2",
          pb: 1,
          maxWidth: 300,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="#1976d2"
          letterSpacing={1}
        >
          Task Manager
        </Typography>
      </Box>
      <TaskList />
    </Container>
  );
};

export default App;
