// import QRCode from 'qrcode.react';
// import { useState } from 'react';
// import { createSession } from '../../services/AttandanceService';
// import React from 'react'

// function QRCodeGenerator({ teacherId, classId }) {
//     const [sessionId, setSessionId] = useState('');

//       const handleGenerateQRCode = async () => {
//         const session = await createSession(teacherId, classId);
//         setSessionId(session);
//       };
    
//       return (
//         <div>
//           <button onClick={handleGenerateQRCode}>Generate QR Code</button>
//           {sessionId && <QRCode value={sessionId} />}
//         </div>
//       );
// }

// export default QRCodeGenerator

