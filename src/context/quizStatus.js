import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseUrl } from "../baseUrl";

export const QuizContext = createContext();

export default function AppContextProvider({ children }) {
  const [currentTimeLeft, setCurrentTimeLeft] = useState(localStorage.getItem('timeLeft') ?? 600);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(localStorage.getItem('currentQuestionIndex') ?? 0);  
  const [studentAnswer, setStudentAnswer] = useState({});
  const [showResult , setShowResult] = useState(false);

  const value = {
    currentTimeLeft,
    setCurrentTimeLeft, 
    currentQuestionIndex,
    setCurrentQuestionIndex,
    studentAnswer,
    setStudentAnswer,
    showResult,
    setShowResult,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
