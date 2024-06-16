import React, { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import  {QuizContext}  from '../context/quizStatus';
const Timer = () => {

  const { 
    currentTimeLeft,
    setCurrentTimeLeft, 
    currentQuestionIndex,
    setCurrentQuestionIndex ,
    setShowResult
  } = useContext(QuizContext);
  useEffect(() => {
    if (currentTimeLeft > 0) {
      const timerId = setInterval(() => {
        setCurrentTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [currentTimeLeft]);

  useEffect(() => {
    setCurrentTimeLeft(currentTimeLeft);
    localStorage.setItem('timeLeft', currentTimeLeft);
    if(currentTimeLeft === 0){
      toast.success("Time Up..Test Submitted Successfully");
      setShowResult(true);
    }
  }, [currentTimeLeft]);

  return (
    <div>
      <h2>Time Left: {Math.floor(currentTimeLeft / 60)}:{currentTimeLeft % 60}</h2>
    </div>
  );
};

export default Timer;
