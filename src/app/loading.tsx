import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-300 from-10% via-indigo-500 via-30% to-red-600 bg-[size:400%_400%] animate-[gradient_15s_ease_infinite]">
        <p className="text-4xl md:text-8xl text-center text-white opacity-50 animate-bounce">
          <FontAwesomeIcon icon={faDiceD20} className="me-4" />
          Roll Initiative...
        </p>
      </div>
    </div>
  );
};

export default Loading;
