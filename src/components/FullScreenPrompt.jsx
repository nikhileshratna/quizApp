import React, { useState, useEffect } from 'react';
import { enterFullScreen, isFullScreen } from '../utils/fullscreen';

const FullScreenPrompt = ({ children }) => {
  const [fullScreenPromptVisible, setFullScreenPromptVisible] = useState(false);
  // const { 
  //   currentTimeLeft,
  //   setCurrentTimeLeft, 
  //   currentQuestionIndex,
  //   setCurrentQuestionIndex 
  // } = useContext(QuizContext);

  useEffect(() => {
    if (!isFullScreen()) {
      setFullScreenPromptVisible(true);
    }

    const handleFullScreenChange = () => {
      if (!isFullScreen()) {
        setFullScreenPromptVisible(true);
      } else {
        setFullScreenPromptVisible(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  const handleFullScreenButtonClick = () => {
    enterFullScreen();
    // if(localStorage.getItem('timeLeft')) {
        
    // }
    // if(localStorage.getItem('currentQuestionIndex')) {
    // }
    setFullScreenPromptVisible(false);
  };

  return (
    <div>
      {fullScreenPromptVisible && (
        <div className="fullscreen-prompt flex flex-col gap-2">

          <p className='text-3xl font-bold	'>Please enable full-screen mode to continue the quiz.</p>

          <button className="mx-[250px] w-[175px]
          bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full
          " onClick={handleFullScreenButtonClick}>Enter Full-Screen</button>
          
        </div>
      )}
      {!fullScreenPromptVisible && children}
    </div>
  );
};

export default FullScreenPrompt;
