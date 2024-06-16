import React from 'react';
import Quiz from './components/Quiz';
import FullScreenPrompt from './components/FullScreenPrompt';
import './App.css'; 
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
      <FullScreenPrompt>
        <Quiz />
        <Toaster />
      </FullScreenPrompt>
  );
};

export default App;
