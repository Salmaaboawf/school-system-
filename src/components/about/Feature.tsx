import { Accordion } from "flowbite-react";
function Feature() {
  return (
    <div>
      {/* <h2 className="text-3xl">Frequently Asked Questions (FAQ)</h2> */}
      <h2 className="text-2xl text-slate-700	 font-normal leading-tight mb-2 ">
       Frequently Asked Questions (FAQ)
      </h2>
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>What are the school hours?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our school operates from 7:00 AM to 3:30 PM, Monday through
              Friday. We have a short break in the morning and a lunch break
              from 12:00 PM to 12:30 PM.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How can I check my child’s academic progress?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Parents can log into the online portal using their credentials to
              view their child's grades, assignments, and attendance records.
              The portal is updated regularly by teachers to ensure real-time
              tracking.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What extracurricular activities does the school offer?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              We offer a wide range of extracurricular activities including
              sports (soccer, basketball, and swimming), arts (music, drama, and
              painting), and academic clubs (science, debate, and robotics).
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How do I enroll my child in your school?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Enrollment is easy! You can visit the admissions page on our
              website, fill out the online application form, and submit the
              necessary documents. Our admissions team will reach out to you
              with the next steps.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What is the school’s policy on uniforms?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our school has a strict uniform policy. All students are required
              to wear the prescribed school uniform during school hours and at
              official events. Detailed uniform guidelines are available in the
              student handbook and on our website.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What safety measures are in place at the school?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Safety is our top priority. We have a secure campus with monitored
              entry points, CCTV surveillance, and a dedicated safety team. We
              also conduct regular fire drills and have protocols in place for
              emergencies to ensure the safety of all students and staff.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default Feature;

