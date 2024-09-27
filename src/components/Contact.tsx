// import { Form } from 'react-router-dom';
import './Contact.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addContact } from '../services/contactService';

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
    .required("Name is required")
    .max(20, " Name cannot exceed 20 characters")
    .min(3, "Minimum 3 characters required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  message: yup
    .string()
    .required("Message is required")
    .max(100, "Your message cannot exceed 100 characters")
    .min(15, "Your message must be at least 15 characters"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.message) {
      toast.error(errors.message.message);
    }
  }, [errors]);

  const sendContact = (data) => {
    const currentDate = new Date().toISOString();
    const contactData = {
      ...data,
      date: currentDate,
    };
    addContact(contactData);
  };

  return (
    <div className="contact-page-container flex justify-center items-center min-h-screen bg-gray-100 py-16">
      <div className="contact-form-wrapper bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"> {/* Increased width */}
        <div className="contact-header mb-6">
          <h2 className="text-3xl font-bold text-center text-[#ff4e31] animate-typing">We would love to hear from you!</h2>
        </div>
        <form onSubmit={handleSubmit(sendContact)} className="space-y-6">
          <div className="form-group">
            <label htmlFor="name" className="block text-[#ff4e31] font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#002749]"
              {...register("name")}
            />
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-[#ff4e31] font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#002749]"
              {...register("email")}
            />
            <p className="text-red-500 mt-1">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block text-[#ff4e31] font-medium mb-2">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Enter your message"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#002749]"
              {...register("message")}
            ></textarea>
            <p className="text-red-500 mt-1">{errors.message?.message}</p>
          </div>
          <div className="button-container text-center">
            <button type="submit" className="bg-[#ff4e31] text-white px-6 py-3 rounded-lg hover:bg-[#002749] focus:outline-none transition duration-300">
              Contact Us
            </button>
          </div>
        </form>
        {/* Start map iframe */}
        <div className="map-container mt-6">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252883.5586312063!2d32.84668933289582!3d23.588100097184197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14454b68a03db2f7%3A0x5e0d62f4706765e0!2z2K3YqNix2KfYqiDZhNin2YTZhNio2KfYp9mI2YzYqSDZg9in2YXYqtmI2YXYqSDZg9mK!5e0!3m2!1sen!2seg!4v1692367676813!5m2!1sen!2seg"
            width="100%" // Made the map responsive
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* End map iframe */}
      </div>
    </div>
  );
}

export default Contact;







// import React from "react";

// const Contact = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden">
//     <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg")' }}>
//       <div className="bg-[#f8f4e5] p-8 w-[90vw] max-w-[800px] border-2 border-black shadow-[15px_15px_1px_#ffa580,15px_15px_1px_2px_rgba(0,0,0,1)]">
//         <form>
//           <input
//             type="text"
//             placeholder="Name"
//             required
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             name="customerEmail"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             name="customerPhone"
//             pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="text"
//             placeholder="Subject"
//             name="subject"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <textarea
//             placeholder="Message"
//             name="message"
//             rows={3}
//             required
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <button
//             type="submit"
//             className="block mx-auto leading-[28pt] px-5 bg-[#ffa580] tracking-widest transition-all ease-in-out duration-200 outline-none border border-black shadow-[3px_3px_1px_1px_#95a4ff,3px_3px_1px_2px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-black"
//           >
//             SEND MESSAGE
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>


//     )
// }
// export default Contact

// import React from "react";

// const Contact = () => {
//   return (
//     <div className="w-full h-screen overflow-hidden ">
//     <div className="w-screen h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-2210775-jpeg.jpg")' }}>
//       <div className="bg-[#f8f4e5] p-8 w-[90vw] max-w-[800px] border-2 border-black shadow-[15px_15px_1px_#ffa580,15px_15px_1px_2px_rgba(0,0,0,1)]">
//         <form>
//           <input
//             type="text"
//             placeholder="Name"
//             required
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             name="customerEmail"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             name="customerPhone"
//             pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <input
//             type="text"
//             placeholder="Subject"
//             name="subject"
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <textarea
//             placeholder="Message"
//             name="message"
//             rows={3}
//             required
//             className="block w-full text-[14pt] leading-[28pt] font-['Fjalla_One'] mb-4 border-none border-b-[5px] border-black bg-[#f8f4e5] min-w-[250px] pl-1 outline-none text-black focus:border-b-[5px] focus:border-[#ffa580]"
//           />
//           <button
//             type="submit"
//             className="block mx-auto leading-[28pt] px-5 bg-[#ffa580] tracking-widest transition-all ease-in-out duration-200 outline-none border border-black shadow-[3px_3px_1px_1px_#95a4ff,3px_3px_1px_2px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-black"
//           >
//             SEND MESSAGE
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
  
// //   );
// // };

// // export default Contact;
