// import { Form } from 'react-router-dom';
import './Contact.css';
import { useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addContact } from '../services/contactService';
type Inputs = {
  name: string
  email: string
  message: string
}

const schema= yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
    .required("Name is required")
    .max(20, " Name cannot exceed 20 characters").min(3, "min is 3 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  message: yup.string().required("Message is required")
  .max(100, "Your message cannot exceed 100 letters")
  .min(15, "Your message must be at least 15 letters to better understand it"),
})

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(()=>{
    if(errors.name){
      toast.error(errors.name.message)
    }
    if(errors.email){
      toast.error(errors.email.message)
    }
    if(errors.message){
      toast.error(errors.message.message)
    }
  },[errors])

  const sendContact = (data) => {
    const currentDate = new Date().toISOString();
    const contactData = {
      ...data,
      date:currentDate
    }
    addContact(contactData)
  }
  return (
    
// <div className="flex justify-center items-center min-h-screen bg-white py-16">
// <div className="contact-card">
// <aside className=" contact-form">
// <div className="contact-bio ">
// <div className="hello-container text-center">
 
//         <h2 className="text-3xl font-bold text-purple mb-4">SAY HELLO!</h2>
//          <p className="text-lightBlue">We would love to hear from you!</p>
//         <hr className="underline border-orange my-3 w-20 mx-auto" />
//       </div>
//           <form className=" space-y-3" action="#" onSubmit={handleSubmit(sendContact)}>
//             <div className="flex flex-col">
//               <label htmlFor="name" className="text-darkBlue font-semibold">Name</label>
//               <input
//                type="text"
//                id="name"
//                 className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//                 {...register('name')}
//               />
//             </div>

//            <div className="flex flex-col">
//               <label htmlFor="email" className="text-darkBlue font-semibold">Email *</label>
//              <input
//                 type="email"
//                id="email"
//                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//                {...register('email')}
//              />
//            </div>

//            <div className="flex flex-col">
//               <label htmlFor="subject" className="text-darkBlue font-semibold">Subject</label>
//               <input
//                 type="text"
//                 id="subject"
//                name="subject"
//                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//              />
//            </div>

//            <div className="flex flex-col">
//              <label htmlFor="message" className="text-darkBlue font-semibold">Message *</label>
//              <textarea
//                id="message"
//                rows={3}
//                 className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//                 {...register('message')}
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-purple text-white px-4 py-2 rounded-md hover:bg-darkBlue transition duration-300"
//            >
//              SEND MESSAGE
//            </button>
//          </form>
//        </div>
//          </aside>
// </div>

// </div>

   
    <div className="flex justify-center items-center min-h-screen bg-white py-16">
      <div className="contact-section bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl" 
           style={{ boxShadow: '0 4px 10px rgba(0, 39, 73, 0.3), 0 6px 20px rgba(255, 78, 49, 0.2)' }}>
        <div className="hello-container text-center">
          <h2 className="text-3xl font-bold text-purple mb-4">SAY HELLO!</h2>
          <p className="text-lightBlue">We would love to hear from you!</p>
          <hr className="underline border-orange my-4 w-20 mx-auto" />
        </div>

        <div className="contact-wrapper grid grid-cols-1 gap-8">
          <form className="contact-form space-y-4" action="#">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-darkBlue font-semibold">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-darkBlue font-semibold">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="subject" className="text-darkBlue font-semibold">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-darkBlue font-semibold">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>

            <button
              type="submit"
              className="bg-purple text-white px-4 py-2 rounded-md hover:bg-darkBlue transition duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
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
