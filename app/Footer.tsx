import React, { useEffect } from 'react';

export default function Footer() {

  return (
    <footer className='text-center text-lg mt-10 bg-_blue bottom-0 absolute w-full'>
      <p>&copy; 2024 ButterFlour</p>
      <p>Contact us: <a href="mailto:butterflourcake@gmail.com" className={'text-blue-600 underline'}>butterflourcake@gmail.com</a></p>
    </footer>
  );
}