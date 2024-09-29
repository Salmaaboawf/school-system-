// // import { Form } from 'react-router-dom';
// import './Contact.css';
// import { useForm} from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { addContact } from '../services/contactService';
// type Inputs = {
//   name: string
//   email: string
//   message: string
// }

// const schema= yup.object({
//   name: yup
//     .string()
//     .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
//     .required("Name is required")
//     .max(20, " Name cannot exceed 20 characters").min(3, "min is 3 letters"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email address"),
//   message: yup.string().required("Message is required")
//   .max(100, "Your message cannot exceed 100 letters")
//   .min(15, "Your message must be at least 15 letters to better understand it"),
// })

// function Contact() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   })

//   useEffect(()=>{
//     if(errors.name){
//       toast.error(errors.name.message)
//     }
//     if(errors.email){
//       toast.error(errors.email.message)
//     }
//     if(errors.message){
//       toast.error(errors.message.message)
//     }
//   },[errors])

//   const sendContact = (data) => {
//     const currentDate = new Date().toISOString();
//     const contactData = {
//       ...data,
//       date:currentDate
//     }
//     addContact(contactData)
//   }
//   return (
    
   
//     <div className="flex justify-center items-center min-h-screen bg-white py-16">
//       <div className="contact-section bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl" 
//            style={{ boxShadow: '0 4px 10px rgba(0, 39, 73, 0.3), 0 6px 20px rgba(255, 78, 49, 0.2)' }}>
//         <div className="hello-container text-center">
//           <h2 className="text-3xl font-bold text-purple mb-4">SAY HELLO!</h2>
//           <p className="text-lightBlue">We would love to hear from you!</p>
//           <hr className="underline border-orange my-4 w-20 mx-auto" />
//         </div>

//         <div className="contact-wrapper grid grid-cols-1 gap-8">
//           <form className="contact-form space-y-4" action="#" onSubmit={handleSubmit(sendContact)}>
//             <div className="flex flex-col">
//               <label htmlFor="name" className="text-darkBlue font-semibold">Name *</label>
//               <input
//                 type="text"
//                 id="name"
//                 className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//                 {...register('name')} 
//               />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="email" className="text-darkBlue font-semibold">Email *</label>
//               <input
//                 type="email"
//                id="email"
//                className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//                {...register('email')}
//              />
//            </div>

//             <div className="flex flex-col">
//               <label htmlFor="message" className="text-darkBlue font-semibold">Message *</label>
//               <textarea
//                 id="message"
//                 rows={5}
//                 {...register('message')} 
//                 className="w-full border border-lightBlue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-purple text-white px-4 py-2 rounded-md hover:bg-darkBlue transition duration-300"
//             >
//               SEND MESSAGE
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;


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
import React from 'react';
import header from '../assets/contactheader2.png'
const Contact = () => {
    return (
        <div>
          
            {/* Contact Header */}
            <div className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${header})` }}>
                <div className="container mx-auto text-center py-20">
                    <h2 className="text-4xl font-semibold text-secondary ">Contact Us</h2>
                    <p className="text-xl text-secondary">Kindly reach us to get the fastest response and treatment</p>
                </div>
            </div>

            {/* Contact Form */}
            <form className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg mt-[-30px] z-50">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input type="text" placeholder="David John" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
                    </div>
                    <div>
                        <label className="block mb-2">Medical Number</label>
                        <input type="text" placeholder="123-789-654" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block mb-2">Age</label>
                        <input type="number" max="100" placeholder="22" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
                    </div>
                    <div>
                        <label className="block mb-2">Phone Number</label>
                        <input type="tel" placeholder="0123456789" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block mb-2">Reason for Visit</label>
                    <textarea placeholder="Briefly describe the reason for your visit" className="w-full h-32 border border-gray-300 rounded-lg px-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block mb-2">Department</label>
                        <select className="w-full h-14 border border-gray-300 rounded-lg px-3">
                            <option value="general-medicine">General Medicine</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="orthopedics">Orthopedics</option>
                            <option value="gynecology">Gynecology and Obstetrics</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="radiology">Radiology</option>
                            <option value="laboratory">Laboratory Services</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Date</label>
                        <input type="datetime-local" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
                    </div>
                </div>

                <button type="submit" className="mt-6 w-full h-14 bg-secondary text-white rounded-lg">Submit</button>
            </form>

            {/* Map Section */}
            <div className="container mx-auto text-center my-12 mb-10">
                <h2 className="text-4xl font-semibold text-secondary">Find Us Here</h2>
                <div className="flex justify-between mt-8 mb-10">
                    <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                        <i className="fas fa-phone text-2xl mr-3"></i>
                        <div>
                            <h4 className="font-bold">Phone</h4>
                            <p>123-456-7890</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-200 p-4 rounded-lg ml-36 ">
                        <i className="fas fa-envelope text-2xl mr-3"></i>
                        <div>
                            <h4 className="font-bold ">Email</h4>
                            <p>schollarsway_school@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-200 p-4 rounded-lg">
                        <i className="fas fa-location-dot text-2xl mr-3"></i>
                        <div>
                            <h4 className="font-bold">Location</h4>
                            <p>123 Elm ST. Healthland</p>
                        </div>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738390.02001786!2d16.149902343750007!3d25.59694832328611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15b3570b14690069%3A0xde836ae65e98fa50!2sMedOne%20Clinic!5e0!3m2!1sen!2seg!4v1716564344470!5m2!1sen!2seg"
                    width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
            </div>

           
        </div>
    );
};

export default Contact;
