

import React, { useState } from 'react';
import  {QRCodeSVG}  from 'qrcode.react';
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
    <div>
      <button onClick={generateQRCode} className='border bg-slate-500 rounded-md text-white cursor-pointer'>Generate QR Code for Today</button>
      {qrData && (
        <div>
          <QRCodeSVG value={qrData as string} />
        </div>
      )}
    </div>
  );
};

export default AttendanceQRCode;
