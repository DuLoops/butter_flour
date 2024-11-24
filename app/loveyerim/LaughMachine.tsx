import React, { useState } from 'react';
import Image from 'next/image';
// Sample array of photo URLs
const photos = [
    '/images/laugh/1.jpeg',
    '/images/laugh/2.jpeg',
    '/images/laugh/3.jpeg',
    '/images/laugh/4.jpeg',
    '/images/laugh/5.jpeg',
    '/images/laugh/6.jpeg',

    '/images/laugh/7.jpeg',
    '/images/laugh/8.jpeg',
    '/images/laugh/9.jpeg',
    '/images/laugh/10.jpeg',
    '/images/laugh/11.jpeg',
    '/images/laugh/12.jpeg',
    
    '/images/laugh/13.jpeg',
    '/images/laugh/14.jpeg',
    '/images/laugh/15.jpeg',
    '/images/laugh/16.jpeg',
    '/images/laugh/17.jpeg',
    '/images/laugh/18.jpeg',
    '/images/laugh/19.jpeg',
    '/images/laugh/20.jpeg',
    '/images/laugh/21.jpeg',
    '/images/laugh/22.jpeg',
    '/images/laugh/23.jpeg',
    '/images/laugh/24.jpeg', 
    '/images/laugh/25.jpeg',
    '/images/laugh/26.jpeg',
    '/images/laugh/27.jpeg',
    '/images/laugh/28.jpeg',
    '/images/laugh/29.jpeg',
    '/images/laugh/30.jpeg',
    '/images/laugh/31.jpeg',
    '/images/laugh/32.jpeg',
    '/images/laugh/33.jpeg',
    '/images/laugh/34.jpeg',
    '/images/laugh/35.jpeg',
    '/images/laugh/36.jpeg',
    '/images/laugh/37.jpeg',
    '/images/laugh/38.jpeg',
];

const LaughMachine = () => {
  // State to hold the index of the current photo
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Function to handle button click and set a random photo
  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    setCurrentPhotoIndex(randomIndex);
  };

  return (
    <div className="flex flex-col items-center h-[200px] mb-2">
      <Image 
        src={photos[currentPhotoIndex]} 
        alt="Random" 
        className="w-3/4 h-auto rounded shadow-lg" 
      />
      <button 
        onClick={handleButtonClick} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Laugh Generator 1000 - Click me!
      </button>
    </div>
  );
};

export default LaughMachine;