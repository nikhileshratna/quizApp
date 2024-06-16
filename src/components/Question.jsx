import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { QuizContext } from '../context/quizStatus';

const Question = ({ question, onNext, onPrev }) => {
  const {
    currentTimeLeft,
    setCurrentTimeLeft,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    studentAnswer,
    setStudentAnswer,
  } = useContext(QuizContext);
  const qid = question.id;

  const [clickedOption, setClickedOption] = useState(0);

  useEffect(() => {
    // console.log("useEffect triggered with studentAnswer:", studentAnswer);
    if (studentAnswer?.[qid]) {
      setClickedOption(studentAnswer?.[qid]);
    } else {
      setClickedOption(0);
    }
  }, [studentAnswer, qid,currentQuestionIndex]);

  return (
    <div>
      <div className='question'>
        <span id='question-number'>
          {question.id}.
        </span>
        <span id='question-txt'>{question?.question}</span>
      </div>

      <div className='option-container'>
        {question.options.map((option, i) => (
          <button
            className={`option-btn ${clickedOption === i + 1 ? "checked" : ""}`}
            key={i}
            onClick={() => {
              setClickedOption(i + 1);
              setStudentAnswer({ ...studentAnswer, [qid]: i + 1 });
              localStorage.setItem("studentAnswer", JSON.stringify({...studentAnswer , [qid]: i + 1}));
              toast.success('Answer Submitted Successfully');
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
