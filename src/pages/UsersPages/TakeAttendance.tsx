

import React, { useState } from 'react';
import  {QRCodeSVG}  from 'qrcode.react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav';
import { Button } from 'flowbite-react';
// import { collection, addDoc } from 'firebase/firestore';
// import {db} from '../../config/firebase'

const AttendanceQRCode = () => {
  const [qrData, setQrData] = useState('');

  // Function to generate QR Code data for the current date
  const generateQRCode = async () => {
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setQrData(`Attendance-${today}`);
    
  };

  return (
<>
<div className='container xs:px-0 lg:px-20'>
<div>
        <Nav />
      </div>
    <div className="mt-20">
 <Header />
</div>
    <div className='my-20 mx-auto w-fit'>
      <Button outline onClick={generateQRCode} className='my-5 lg:w-72 sm:w-32 xs:w-72'>Generate QR Code for Today</Button>
      {qrData && (
        <div>
          <QRCodeSVG value={qrData as string} fgColor={'#ff4e31'} size={256}/>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default AttendanceQRCode;
