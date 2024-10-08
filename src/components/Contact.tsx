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
    .max(200, "Your message cannot exceed 200 characters")
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
            We welcome your questions and concerns <div className='my-2'></div> please contact us for a swift response
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
          <div className="flex justify-between mt-8 mb-10 xs:flex-col lg:flex-row xs:gap-y-4 lg:gap-y-0">
              <div className="flex items-center bg-gray-200 p-4 rounded-lg ">
                  <MdPhoneInTalk className='text-4xl mr-3 text-deepBlue'/>
                  <div className='w-56'>
                      <h4 className="font-bold text-deepBlue">Phone</h4>
                      <p className='text-deepBlue'>123-456-7890</p>
                  </div>
              </div>
              <div className="flex items-center bg-gray-200 p-4 rounded-lg">
              <MdEmail className='text-4xl mr-3 text-deepBlue' />
                  <div className='w-56'>
                      <h4 className="font-bold text-deepBlue">Email</h4>
                      <p className='text-deepBlue'>schollarsway_school@gmail.com</p>
                  </div>
              </div>
              <div className="flex items-center bg-gray-200 p-4 rounded-lg">
              <MdLocationOn className='text-4xl mr-3 text-deepBlue'/>
                  <div className='w-56'>
                      <h4 className="font-bold text-deepBlue">Location</h4>
                      <p className='text-deepBlue'>123 Elm ST. Healthland</p>
                  </div>
              </div>
          </div>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738390.02001786!2d16.149902343750007!3d25.59694832328611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15b3570b14690069%3A0xde836ae65e98fa50!2sMedOne%20Clinic!5e0!3m2!1sen!2seg!4v1716564344470!5m2!1sen!2seg"
              width="100%" height="450" className='rounded-xl' style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
      </div>
    </div>
  );
}

export default Contact;
