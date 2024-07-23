const AddStudent = () => {
  return (
    <section className="w-full  shadow-md">
      <h3 className="bg-emerald-500 text-white font-bold py-4 pl-4 text-lg">
        Add Student
      </h3>
      <form action="#" className="p-4 w-full">
        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:lg:w-2/4">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
              id="fname"
              placeholder="First name"
              required
            />
          </div>

          <div className="lg:lg:w-2/4">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
              id="lname"
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:lg:w-2/4">
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
              id="mail"
              placeholder="Email"
              required
            />
          </div>

          <div className="lg:lg:w-2/4">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
              id="phone"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:w-2/4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
              id="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="lg:w-2/4">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
              id="confirm"
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>

        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:w-2/4">
            <label htmlFor="user_photo">Upload Photo</label>
            <input
              type="file"
              id="user_photo"
              className="block pl-2 w-full mt-2 py-1 border-gray-300 rounded"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddStudent;
