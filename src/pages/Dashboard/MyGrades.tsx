import React from 'react'
// import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header/Header'

function MyGrades() {
  return (
   
        <div className="container flex gap-x-5  ">
          {/* <div className="flex-[1]">
            <Sidebar />
          </div> */}
          <div className="flex-[4]">
            <div>
              <Header />
            </div>
            <div className="my-5">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-0  text-[#002749]">
                <h1 className="text-3xl mb-4">My Grades</h1>
                {/* <p className="text-2xl my-2">salma</p> */}
                <div className="overflow-hidden min-w-full ">
                  <table className="min-w-full text-center text-sm font-light ">
                    <thead className="border-b  font-medium text-white bg-[#002749] border-[#002749]">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-2xl">
                         Subject
                        </th>
                        <th scope="col" className="px-6 py-4 text-2xl">
                         Grade
                        </th>
                        {/* <th scope="col" className="px-6 py-4">
                          9:00-11:00
                        </th>
                        <th scope="col" className="px-6 py-4">
                          11:00-1:00
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                          Maths
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          A
                        </td>
    
                        {/* <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          C-2
                        </td> */}
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                         Science
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B+
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          C-2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-1
                        </td> */}
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                          German
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          C
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-1
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-2
                        </td> */}
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                          English
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          A-
                        </td>
    
                        {/* <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          A-2
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-1
                        </td> */}
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                          History
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          C-
                        </td>
                        {/* <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          B-1
                        </td>
    
                        <td className="whitespace-nowrap px-6 py-4 text-2xl">
                          C-1
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default MyGrades