import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { generateId } from "../../utils/common";

const CreateExam = (props) => {
  const { question } = props;
  console.log(Boolean(question));
  const [questions, setQuestions] = useState({
    title: "",
    id: "",
    description: "",
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(
    question?.questions.question
  );
  const [title, setTitle] = useState(question?.title);
  const [id, setId] = useState(question?.id);
  const [idAnswer, setIdAnswer] = useState(question?.questions.idAnswer);
  const [description, setDescription] = useState(question?.description);
  const [answers, setAnswers] = useState(
    question?.questions.answers
      ? question?.questions.answers
      : [
          {
            id: "",
            is_true: false,
            text: "",
          },
          {
            id: "",
            is_true: false,
            text: "",
          },
          {
            id: "",
            is_true: false,
            text: "",
          },
          {
            id: "",
            is_true: false,
            text: "",
          },
        ]
  );

  var searchParams = new URLSearchParams(window.location.search);
  var examName = searchParams.get("examName")
    ? searchParams.get("examName")
    : questions.title;

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem(examName));
    if (savedQuestions) {
      setQuestions(savedQuestions);
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    const newId = generateId();
    setId(newId);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const handleAnswerChange = (index, e) => {
    const newId = generateId();
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = e.target.value;
    if (!question?.questions.idAnswer) {
      setIdAnswer(newId);
    }
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index) => {
    const updatedAnswers = [...answers];
    answers.map((item) => {
      item.is_true = false;
    });
    updatedAnswers[index].is_true = true;
    setAnswers(updatedAnswers);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question: currentQuestion,
      answers: answers,
      idAnswer,
    };

    setQuestions({
      title,
      description,
      id,
      questions: [...questions.questions, newQuestion],
    });
    localStorage.setItem(
      title,
      JSON.stringify({
        title,
        description,
        id,
        questions: [...questions.questions, newQuestion],
      })
    );

    setCurrentQuestion("");
    setAnswers([
      {
        id: "",
        is_true: false,
        text: "",
      },
      {
        id: "",
        is_true: false,
        text: "",
      },
      {
        id: "",
        is_true: false,
        text: "",
      },
      {
        id: "",
        is_true: false,
        text: "",
      },
    ]);
  };

  const handleUpdateQuestion = () => {
    const newQuestion = {
      questions: questions.questions,
      id,
      title,
      description,
    };

    questions?.questions.map((item) => {
      if (questions.id === newQuestion.id) {
        setQuestions({ ...questions, ...newQuestion });
      }
    });
  };

  const enableAddQuestionButton = () => {
    const allAnswersExist = answers.every((item) => item?.text.length !== 0);
    const selectCorrectAnswer = answers.some((item) => item?.is_true === true);
    return !(
      allAnswersExist &&
      Boolean(currentQuestion) &&
      selectCorrectAnswer
    );
  };

  return (
    <Container>
      <TextField
        label="Exam Title"
        value={title}
        name="1"
        onChange={handleTitleChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Exam Description"
        value={description}
        fullWidth
        onChange={handleDescriptionChange}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Question"
        className="question"
        value={currentQuestion}
        onChange={handleQuestionChange}
        variant="outlined"
        margin="normal"
      />
      {answers?.map((answer, index) => (
        <div className="answerBox" key={index}>
          <TextField
            label={`Answer ${index + 1}`}
            className="answer"
            value={answer?.text}
            onChange={(e) => handleAnswerChange(index, e)}
            variant="outlined"
            margin="normal"
          />
          <FormControl component="fieldset">
            <RadioGroup
              row
              className="selectAnswer"
              aria-label="correctAnswer"
              name="correctAnswer"
              value={answers[index].is_true === true ? "true" : "false"}
              onChange={() => handleCorrectAnswerChange(index)}
            >
              <FormControlLabel
                checked={answer.is_true}
                control={<Radio />}
                label="Correct Answer"
              />
            </RadioGroup>
          </FormControl>
        </div>
      ))}
      {Boolean(question) ? (
        <Button
          className="button"
          onClick={handleUpdateQuestion}
          variant="contained"
          disabled={enableAddQuestionButton()}
          color="primary"
        >
          Update Question
        </Button>
      ) : (
        <Button
          className="button"
          onClick={handleAddQuestion}
          variant="contained"
          disabled={enableAddQuestionButton()}
          color="primary"
        >
          Add Question
        </Button>
      )}
      <Button className="button" component={Link} to="/" variant="contained">
        Back to Home
      </Button>
    </Container>
  );
};

export default CreateExam;
