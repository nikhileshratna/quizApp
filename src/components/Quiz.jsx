import React, { useState, useEffect, useContext } from 'react';
import Question from './Question';
import Timer from './Timer';
import { QuizContext } from '../context/quizStatus';
import QuizResult from './QuizResult';
import { toast } from 'react-hot-toast';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  
  const {
    currentTimeLeft,
    setCurrentTimeLeft,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    showResult,
    setShowResult,
    studentAnswer,
    setStudentAnswer
  } = useContext(QuizContext);

  useEffect(() => {
    const data = require('../data/question.json');
    setQuestions(data);

    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedTime = localStorage.getItem('timeLeft');
    const savedAnswer = localStorage.getItem('studentAnswer');

    if (savedIndex !== null) {
      setCurrentQuestionIndex(Number(savedIndex));
    }
    if (savedTime !== null) {
      setCurrentTimeLeft(Number(savedTime));
    }
    if (savedAnswer !== null) {
      setStudentAnswer(JSON.parse(savedAnswer));
    }
  },[]);

  const [score , setScore] = useState(0);

  const handleTryAgain = () => {
    setScore(0);
    setCurrentTimeLeft(600);
    setCurrentQuestionIndex(0);
    setStudentAnswer({});
    setShowResult(false);
  }

  useEffect(() => {
    const data = require('../data/question.json');
    // setQuestions(data);
    let finalScore = 0;
    data?.forEach(element => {
      console.log("inside for each loop",studentAnswer[element.id]  , element.answer);
      if(studentAnswer[element.id] === element.answer){
        finalScore = finalScore + 1;
      }
    });

    setScore(finalScore);
  
    console.log("from quiz result");
    console.log(studentAnswer);
    console.log(data);
  }, [studentAnswer, currentQuestionIndex]); 

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1);
    }
    else{
      toast.success('All Question Completed...Please Submit Test');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      localStorage.setItem('currentQuestionIndex', currentQuestionIndex - 1);
    }
    else{
      toast.error('No Previous Question');
    }
  };

  return (
    <div>
      {!setShowResult && <p className="heading-txt">Quiz App</p>}
      <div>
        {showResult ? (
          <QuizResult score = {score} handleTryAgain = {handleTryAgain}/>
        ) : ( 
          questions.length > 0 && (
            <div className="container">
              <Timer/>
              <Question
                question={questions[currentQuestionIndex]}
                onNext={handleNext}
                onPrev = {handlePrev}
              />

              <div>
                <div className=''>
                  <input 
                    onClick={handlePrev}
                    type="button"
                    className='prev-button mx-[-150px] cursor-pointer'
                    value="Prev"

                  />

                  <input 
                    onClick={handleNext}
                    type="button"
                    className='next-button mx-[90px] cursor-pointer'
                    value="Next"
                  />
                </div>
              </div>
            </div>
          )

        )}
      </div>
      {
        !showResult &&
      <button
        className='submit-button
        mt-[20px] mx-[12%]'

        onClick={() =>{
          setShowResult(true);
          toast.success('Test Submitted Successfully');
        }}
      >
        Submit Test
      </button>
      }
    </div>
  );
};

export default Quiz;
