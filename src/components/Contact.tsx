// // import { Form } from 'react-router-dom';
// import './Contact.css';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { addContact } from '../services/contactService';
// import header from '../assets/images/contactHeader.png'
// import { FaPhone, FaPhoneVolume } from 'react-icons/fa';
// import { MdEmail, MdLocationOn, MdPhoneInTalk } from 'react-icons/md';
// type Inputs = {
//   name: string
//   email: string
//   message: string
// }

// // Validation schema
// const schema = yup.object({
//   name: yup
//     .string()
//     .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
//     .required("Name is required")
//     .max(20, " Name cannot exceed 20 characters")
//     .min(3, "Minimum 3 characters required"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email address"),
//   message: yup
//     .string()
//     .required("Message is required")
//     .max(100, "Your message cannot exceed 100 characters")
//     .min(15, "Your message must be at least 15 characters"),
// });

// function Contact() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     if (errors.name) {
//       toast.error(errors.name.message);
//     }
//     if (errors.email) {
//       toast.error(errors.email.message);
//     }
//     if (errors.message) {
//       toast.error(errors.message.message);
//     }
//   }, [errors]);

//   const sendContact = async (data) => {
//     const currentDate = new Date().toISOString();
//     const contactData = {
//       ...data,
//       date:currentDate
//     }
//     try {
//       // Wait for the data to be sent
//       await addContact(contactData);
      
//       // Reset the form inputs after the data is sent successfully
//       reset();
//     } catch (error) {
//       console.error("Error sending contact data:", error);
//       // Handle error (optional: show a message to the user)
//     }
//     reset();
//   }
//   return (
//     <>
   
//     {/* <div className="flex justify-center items-center min-h-screen bg-white py-16">
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
//           </div>
//         </form>
//         {/* Start map iframe */}
//         <div className="map-container mt-6">
//           <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252883.5586312063!2d32.84668933289582!3d23.588100097184197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14454b68a03db2f7%3A0x5e0d62f4706765e0!2z2K3YqNix2KfYqiDZhNin2YTZhNio2KfYp9mI2YzYqSDZg9in2YXYqtmI2YXYqSDZg9mK!5e0!3m2!1sen!2seg!4v1692367676813!5m2!1sen!2seg"
//             width="100%" // Made the map responsive
//             height="450"
//             style={{ border: 0 }}
//             allowFullScreen={true}
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//         {/* End map iframe */}
//       </div>
//     </div> */}


//   <div>
    
//       {/* Contact Header */}
//       <div className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${header})` }}>
//           <div className="container mx-auto pt-40 flex items-center">
//               {/* <h2 className="text-4xl font-semibold text-secondary ">Contact Us</h2> */}
//               <p className="text-3xl text-deepBlue font-bold pl-16">We welcome your questions and concerns <br></br> please contact us for a swift response</p>
//           </div>
//       </div>

//       {/* Contact Form */}
//       <form className="max-w-3xl mx-auto py-8 px-20 bg-white shadow-xl rounded-xl mt-[-30px] z-50" onSubmit={handleSubmit(sendContact)}>
//           {/* <div className="grid grid-cols-2 gap-4">
//               <div>
//                   <label className="block mb-2">Name</label>
//                   <input type="text" placeholder="David John" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
//               </div>
//               <div>
//                   <label className="block mb-2">Medical Number</label>
//                   <input type="text" placeholder="123-789-654" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
//               </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                   <label className="block mb-2">Age</label>
//                   <input type="number" max="100" placeholder="22" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
//               </div>
//               <div>
//                   <label className="block mb-2">Phone Number</label>
//                   <input type="tel" placeholder="0123456789" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
//               </div>
//           </div>

//           <div className="mt-4">
//               <label className="block mb-2">Reason for Visit</label>
//               <textarea placeholder="Briefly describe the reason for your visit" className="w-full h-32 border border-gray-300 rounded-lg px-3" />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                   <label className="block mb-2">Department</label>
//                   <select className="w-full h-14 border border-gray-300 rounded-lg px-3">
//                       <option value="general-medicine">General Medicine</option>
//                       <option value="pediatrics">Pediatrics</option>
//                       <option value="cardiology">Cardiology</option>
//                       <option value="orthopedics">Orthopedics</option>
//                       <option value="gynecology">Gynecology and Obstetrics</option>
//                       <option value="dermatology">Dermatology</option>
//                       <option value="radiology">Radiology</option>
//                       <option value="laboratory">Laboratory Services</option>
//                   </select>
//               </div>
//               <div>
//                   <label className="block mb-2">Date</label>
//                   <input type="datetime-local" className="w-full h-14 border border-gray-300 rounded-lg px-3" />
//               </div>
//           </div>

//           <button type="submit" className="mt-6 w-full h-14 bg-secondary text-white rounded-lg">Submit</button> */}
     
//      <div className="flex flex-col">
//               <label htmlFor="name" className="text-deepBlue  font-semibold my-3">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
//                 {...register('name')} 
//               />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="email" className="text-deepBlue font-semibold my-3">Email</label>
//               <input
//                 type="email"
//                id="email"
//                className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
//                {...register('email')}
//              />
//            </div>

//             <div className="flex flex-col">
//               <label htmlFor="message" className="text-deepBlue font-semibold my-3">Message</label>
//               <textarea
//                 id="message"
//                 rows={5}
//                 {...register('message')} 
//                 className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
//               />
//             </div>

//             <button
//               type="submit"
//               className="formButton w-80 mt-6 mx-auto block"
//             >
//               SEND MESSAGE
//             </button>
     
//       </form>

//       {/* Map Section */}
//       <div className="container mx-auto my-12 mb-10 text-deepBlue px-10">
//           <h2 className="text-4xl font-bold text-deepBlue">Find Us Here</h2>
//           <div className="flex justify-between mt-8 mb-10">
//               <div className="flex items-center bg-gray-200 p-4 rounded-lg ">
//                   <MdPhoneInTalk className='text-4xl mr-3 text-deepBlue'/>
//                   <div>
//                       <h4 className="font-bold text-deepBlue">Phone</h4>
//                       <p className='text-deepBlue'>123-456-7890</p>
//                   </div>
//               </div>
//               <div className="flex items-center bg-gray-200 p-4 rounded-lg ml-36 ">
//               <MdEmail className='text-4xl mr-3 text-deepBlue' />
//                   <div>
//                       <h4 className="font-bold text-deepBlue">Email</h4>
//                       <p className='text-deepBlue'>schollarsway_school@gmail.com</p>
//                   </div>
//               </div>
//               <div className="flex items-center bg-gray-200 p-4 rounded-lg">
//               <MdLocationOn className='text-4xl mr-3 text-deepBlue'/>
//                   <div>
//                       <h4 className="font-bold text-deepBlue">Location</h4>
//                       <p className='text-deepBlue'>123 Elm ST. Healthland</p>
//                   </div>
//               </div>
//           </div>
//           <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738390.02001786!2d16.149902343750007!3d25.59694832328611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15b3570b14690069%3A0xde836ae65e98fa50!2sMedOne%20Clinic!5e0!3m2!1sen!2seg!4v1716564344470!5m2!1sen!2seg"
//               width="100%" height="450" className='rounded-xl' style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
//       </div>

     
//   </div>

//   </>
// );

// }

// export default Contact;



import './Contact.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addContact } from '../services/contactService';
import header from '../assets/images/contactHeader.png';
import { MdEmail, MdLocationOn, MdPhoneInTalk } from 'react-icons/md';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

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
    reset,
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

  const sendContact = async (data: Inputs) => {
    const currentDate = new Date().toISOString();
    const contactData = {
      ...data,
      date: currentDate
    };
    try {
      await addContact(contactData);
      reset();
    } catch (error) {
      console.error("Error sending contact data:", error);
    }
  };

  return (
    <div>
      {/* Contact Header */}
      <div className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${header})` }}>
        <div className="container mx-auto pt-40 flex items-center">
          <p className="text-3xl text-deepBlue font-bold pl-16">
            We welcome your questions and concerns <br /> please contact us for a swift response
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        className="max-w-3xl mx-auto py-8 px-20 bg-white shadow-xl rounded-xl mt-[-30px] z-50"
        onSubmit={handleSubmit(sendContact)}
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-deepBlue font-semibold my-3">Name</label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
            {...register('name')}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-deepBlue font-semibold my-3">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
            {...register('email')}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="text-deepBlue font-semibold my-3">Message</label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <button
          type="submit"
          className="formButton w-80 mt-6 mx-auto block"
        >
          SEND MESSAGE
        </button>
      </form>

      {/* Map Section */}
      <div className="container mx-auto my-12 mb-10 text-deepBlue px-10">
        <h2 className="text-4xl font-bold text-deepBlue">Find Us Here</h2>
        <div className="flex justify-between mt-8 mb-10">
          <div className="flex items-center bg-gray-200 p-4 rounded-lg">
            <MdPhoneInTalk className='text-4xl mr-3 text-deepBlue' />
            <div>
              <h4 className="font-bold text-deepBlue">Phone</h4>
              <p className="text-deepBlue">123-456-7890</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 p-4 rounded-lg ml-36">
            <MdEmail className="text-4xl mr-3 text-deepBlue" />
            <div>
              <h4 className="font-bold text-deepBlue">Email</h4>
              <p className="text-deepBlue">schollarsway_school@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-200 p-4 rounded-lg">
            <MdLocationOn className="text-4xl mr-3 text-deepBlue" />
            <div>
              <h4 className="font-bold text-deepBlue">Location</h4>
              <p className="text-deepBlue">123 Elm St. Healthland</p>
            </div>
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738390.02001786!2d16.149902343750007!3d25.59694832328611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15b3570b14690069%3A0xde836ae65e98fa50!2sMedOne%20Clinic!5e0!3m2!1sen!2seg!4v1716564344470!5m2!1sen!2seg"
          width="100%"
          height="450"
          className="rounded-xl"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
