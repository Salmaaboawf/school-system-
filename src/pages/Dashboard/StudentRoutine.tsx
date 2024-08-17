// import {Button} from "flowbite-react";
import Nav from "../../components/Nav";
import Footer from "../../components/about/Footer";
const StudentRoutine = () => {
  return (
    <div className="inline-block min-w-90 w-full py-2 sm:px-6 lg:px-8 text-[#002749] ">
      <Nav/>
      <hr></hr>
      <h1 className="text-3xl">classs routine</h1>
      <span className="text-2xl">A-1</span>
      <div className="overflow-hidden min-w-full ">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border-b bg-[#002749] border-[#002749] font-medium text-white ">
            <tr>
          
              <th scope="col" className="px-6 py-4">
                day
              </th>
              <th scope="col" className="px-6 py-4">
                7:00-9:00
              </th>
              <th scope="col" className="px-6 py-4">
                9:00-11:00
              </th>
              <th scope="col" className="px-6 py-4">
                11:00-1:00
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                sun
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                math<h6 className="text-sm">Ahmed ali</h6>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                arabic <h6 className="text-sm">Mona ahmed</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                chemistry <h6 className="text-sm">Salma ahmed</h6>
              </td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                mon
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                english <h6 className="text-sm">Ali ahmed</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                arabic <h6 className="text-sm">Mona ahmed</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                physics <h6 className="text-sm">Salma ahmed</h6>
              </td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Tue
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                math <h6 className="text-sm">Ahmed ali</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                arabic <h6 className="text-sm">Mona ahmed</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                art <h6 className="text-sm">Salma ahmed</h6>
              </td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Wed
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                chemistry <h6 className="text-sm">Salma ahmed</h6>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                english <h6 className="text-sm">Salma ahmed</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                arabic <h6 className="text-sm">Mona ahmed</h6>
              </td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                Thr
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                math <h6 className="text-sm">Ahmed ali</h6>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                arabic <h6 className="text-sm">Mona ahmed</h6>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-2xl">
                physics <h6 className="text-sm">Salma ahmed</h6>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default StudentRoutine;
