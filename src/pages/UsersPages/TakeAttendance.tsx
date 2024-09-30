import React, { useState } from 'react';
import  {QRCodeSVG}  from 'qrcode.react';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav';
import { Button } from 'flowbite-react';
import '../../assets/QRCodeStyles.css'

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
{/* <div>
        <Nav />
      </div> */}
    <div className="mt-10">
 <Header />
</div>
    <div className='my-16 mx-auto w-fit'>
      <Button outline onClick={generateQRCode} className='my-5 lg:w-72 sm:w-32 xs:w-72'>Generate QR Code for Today</Button>
      {qrData && (
        <div className="qr-container">
          <QRCodeSVG value={qrData as string} fgColor={'#ff4e31'} size={256}/>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default AttendanceQRCode;
