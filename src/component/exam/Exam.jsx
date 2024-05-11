import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Button,
} from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

const Exam = () => {
  var searchParams = new URLSearchParams(window.location.search);
  var examName = searchParams.get("examName");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem(examName));

    if (savedQuestions?.length !== 0) {
      setQuestions(savedQuestions);
    }
  }, []);

  const handleAnswerChange = (questionIndex, answerText, isTrue) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: { text: answerText, is_true: isTrue },
    });
  };

  const handelSubmit = () => {
    Object.entries(selectedAnswers).map((item) => {
      if (item[1].is_true) {
        setScore(score + 1);
      }
    });
    setShowResult(true);
  };

  return (
    <Container>
      {showResult ? (
        <>
          <Typography variant="h2">Your Score is :{score}</Typography>
          <br></br>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </>
      ) : (
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
                  <Typography>{question.question}</Typography>
                  <FormControl component="fieldset">
                    {question.answers.map((answer, answerIndex) => (
                      <RadioGroup
                        aria-label={`${question.question}`}
                        name={`${question.question}`}
                        value={selectedAnswers[index]?.text || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            index,
                            e.target.value,
                            answer.is_true
                          )
                        }
                      >
                        <FormControlLabel
                          key={answerIndex}
                          value={answer.text}
                          control={<Radio />}
                          label={answer.text}
                        />
                      </RadioGroup>
                    ))}
                  </FormControl>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Button onClick={handelSubmit} variant="contained">
            Submit
          </Button>
          <br></br>
          <br></br>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </>
      )}
    </Container>
  );
};

export default Exam;
