import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  FormControl,
  Divider,
  Button,
  Box,
} from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CreateExam from "../create_exam/CreateExam";

const EditExam = () => {
  var searchParams = new URLSearchParams(window.location.search);
  var examName = searchParams.get("examName");
  const [questions, setQuestions] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem(examName));

    if (savedQuestions?.length !== 0) {
      setQuestions(savedQuestions);
    }
  }, []);

  const handelChange = (item) => {
    handleOpen();
    const editQuestion = { ...questions, questions: item };
    setSelectedAnswers(editQuestion);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: 500,
    p: 4,
    overflow: "auto",
  };

  return (
    <Container>
        <>
          <Typography variant="h3" gutterBottom>
            {questions?.title}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {questions?.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Questions:
          </Typography>
          <List>
            {questions?.questions?.map((question, index) => (
              <div key={index}>
                <ListItem className="li">
                  <Typography variant="h3">{question.question}</Typography>
                  <FormControl component="fieldset">
                    {question.answers.map((answer, answerIndex) => (
                      <Typography>{answer.text}</Typography>
                    ))}
                  </FormControl>
                  <Button
                    onClick={() => handelChange(question)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          {/* <Button onClick={handelSubmit} variant="contained">
            Submit
          </Button> */}
          <br></br>
          <br></br>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Button onClick={handleClose} className="close" variant="contained">X</Button>
          <CreateExam question={selectedAnswers} />
        </Box>
      </Modal>
    </Container>
  );
};

export default EditExam;
