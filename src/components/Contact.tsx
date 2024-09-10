// import './Contact.css'


// function Contact(){
//     return(
// <div className="main-content">
//   <div className="contact-section">
//     <div className="hello-container">
//       <h2>SAY HELLO!</h2>
//       <p>We would love to hear from you!</p>
//       <hr className="underline" />
//     </div>
//     <div className="contact-wrapper ">
    

//       <form className="contact-form" action="#">
//         <label htmlFor="name">Name *</label>
//         <input type="text" id="name" name="name" required="" />
//         <label htmlFor="email">Email *</label>
//         <input type="email" id="email" name="email" required="" />
//         <label htmlFor="subject">Subject</label>
//         <input type="text" id="subject" name="subject" />
//         <label htmlFor="message">Message *</label>
//         <textarea
//           id="message"
//           name="message"
//           rows={5}
//           required=""
//           defaultValue={""}
//         />
//         <button type="submit" className="send-message">
//           SEND MESSAGE
//         </button>
//       </form>
      
//       <div className="contact-info">
//         <div className="info-box">
//           <div className="icon address-icon" />
//           <div className="info-text">
//             <h3>ADDRESS</h3>
//             <p>
//               Enfant School,
//               <br />
//               12-14 Kensington High Street
//               <br />
//               London, UK
//             </p>
//           </div>
//         </div>
//         <div className="info-box">
//           <div className="icon phone-email-icon" />
//           <div className="info-text">
//             <h3>PHONE &amp; EMAIL</h3>
//             <p>
//               +123 456 7890,
//               <br />
//               +098 765 4321
//               <br />
//               contact@zoutula.com
//             </p>
//           </div>
//         </div>
//         <div className="info-box">
//           <div className="icon business-hours-icon" />
//           <div className="info-text">
//             <h3>BUSINESS HOURS</h3>
//             <p>
//               Monday-Friday,
//               <br />
//               8.00 am – 6.00 pm
//               <br />
//               Weekend Closed
//             </p>
//           </div>
//         </div>
//         <div className="info-box">
//           <div className="icon enfant-hours-icon" />
//           <div className="info-text">
//             <h3>ENFANT HOURS</h3>
//             <p>
//               Monday-Friday,
//               <br />
//               8.00 am – 6.00 pm
//               <br />
//               Weekend Closed
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>


//     )
// }
// export default Contact
import React from "react";

const Contact = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
    <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg")' }}>
      <div className="bg-[#f8f4e5] p-8 w-[90vw] max-w-[800px] border-2 border-black shadow-[15px_15px_1px_#ffa580,15px_15px_1px_2px_rgba(0,0,0,1)]">
        <form>
          <input
            type="text"
            placeholder="Name"
            required
            className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
          />
          <input
            type="email"
            placeholder="Email"
            name="customerEmail"
            className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
          />
          <input
            type="tel"
            placeholder="Phone"
            name="customerPhone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
          />
          <textarea
            placeholder="Message"
            name="message"
            rows={3}
            required
            className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
          />
          <button
            type="submit"
            className="block mx-auto leading-[28pt] px-5 bg-[#ffa580] tracking-widest transition-all ease-in-out duration-200 outline-none border border-black shadow-[3px_3px_1px_1px_#95a4ff,3px_3px_1px_2px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-black"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Contact;
