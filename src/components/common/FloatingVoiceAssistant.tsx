import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export const FloatingVoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {isListening ? (
        <MicOff className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  );
};