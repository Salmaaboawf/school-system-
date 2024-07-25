export default function AddParent() {
  return (
    <section className="shadow-md text-[#002749]">
      <h3 className=" bg-[#002749] text-white font-bold py-4 pl-4 text-lg">
        Add Parent
      </h3>
      <form action="#" className="p-4 w-full">
        {/*  name div  */}
        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:lg:w-2/4">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
              id="fname"
              placeholder="First name"
            />
          </div>

          <div className="lg:lg:w-2/4">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
              id="lname"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* email and phone div */}
        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:lg:w-2/4">
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
              id="mail"
              placeholder="Email"
            />
          </div>

          <div className="lg:lg:w-2/4">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
              id="phone"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* password div and submit btn div */}
        <div className="lg:flex justify-between gap-6 mb-4">
          <div className="lg:w-2/4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0 "
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="lg:w-2/4">
            <label htmlFor="user_photo">Upload Photo</label>

            <input
              type="file"
              id="user_photo"
              className="block pl-2 w-full mt-2 py-1 border-gray-300 rounded"
            />
          </div>
        </div>

        {/* button */}
        <div className="lg:w-2/4">
          <button
            type="submit"
            className="text-[#002749] bg-gray-200 font-bold w-full rounded text-xl lg:mt-6 py-2"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
