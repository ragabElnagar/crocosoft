import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

const Home = () => {
  const savedQuestions = JSON.parse(localStorage.getItem("examQuestions"));
  console.log(savedQuestions);
  const keys = Object.keys(localStorage);

  // Initialize an object to store all items
  const allItems = {};

  // Iterate through each key and get its corresponding value from local storage
  const examList = keys.map((key) => {
    allItems[key] = localStorage.getItem(key);
    return (
      <div>
        <Box className="box">
          Exam Name : <Typography>{key}</Typography>
        </Box>
        <Button
          className="button"
          component={Link}
          to={`Exam?examName=${key}`}
          variant="contained"
        >
          open the exam
        </Button>
        <Button
          className="button"
          component={Link}
          to={`editExam?examName=${key}`}
          variant="contained"
        >
          Edit
        </Button>
      </div>
    );
  });

  return (
    <Container className="container">
      <Button
        className="button"
        component={Link}
        to="createExam"
        variant="contained"
      >
        Add Exam
      </Button>
      {examList}
    </Container>
  );
};

export default Home;
