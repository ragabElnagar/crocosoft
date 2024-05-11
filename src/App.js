import "./App.css";
import CreateExam from "./component/create_exam/CreateExam";
import Exam from "./component/exam/Exam";
import Home from "./component/home/Home";
import EditExam from "./component/edit_exam/EditExam";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/createExam" element={<CreateExam />} />
          <Route path="/editExam" element={<EditExam />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
