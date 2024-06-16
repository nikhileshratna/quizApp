import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { QuizContext } from '../context/quizStatus';

const QuizResult = ({score,handleTryAgain}) => {
  
  
  return (
    <div className='flex flex-col gap-5 justify-centre items-centre'>
      <div className='text-2xl bold'>
          Your Score:{score}<br/>
          Total Score:{10}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={handleTryAgain}>Try Again</button>
    </div>
  )
}

export default QuizResult