// import React, { useState } from 'react';
// import TwilioSms from 'react-twilio-sms';
// const OtpVerification = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [verificationStatus, setVerificationStatus] = useState('');

//   const handleSendOtp = () => {
//     // Generate a random 6-digit OTP for demonstration purposes
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000);

//     // Set the OTP in the state
//     setOtp(generatedOtp.toString());

//     // Set the Twilio credentials
//     const accountSid = 'ACc69ff6453d36288c47dc3d7ecfbf3731';
//     const authToken = 'a63f27531b401b418fae8e4560bdcb62';

//     // Set your Twilio phone number (you can obtain this from your Twilio account)
//     const twilioPhoneNumber = '+917810008757';

//     // Send SMS using Twilio
//     const message = `Your OTP for verification: ${generatedOtp}`;

//     return (
//       <TwilioSms
//         to={phoneNumber}
//         body={message}
//         accountSid={accountSid}
//         authToken={authToken}
//         from={twilioPhoneNumber}
//       />
//     );
//   };

//   const handleVerifyOtp = () => {
//     if (otp === enteredOtp) {
//       setVerificationStatus('OTP Verified Successfully!');
//     } else {
//       setVerificationStatus('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>OTP Verification</h2>
//       <label>
//         Phone Number:
//         <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//       </label>
//       <button onClick={handleSendOtp}>Send OTP</button>

//       <label>
//         OTP:
//         <input type="text" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
//       </label>
//       <button onClick={handleVerifyOtp}>Verify OTP</button>

//       {verificationStatus && <p>{verificationStatus}</p>}
//     </div>
//   );
// };

// export default OtpVerification;
