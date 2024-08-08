


function Gard() {
    return (
        <>
                    {/* <!--  Header start --> */}

            <div>

                <div className="forms p-6 rounded-lg ">
                    <div className="form max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Marks</h2>
                        <form className="flex items-center space-x-4">
                            <div className="flex flex-grow flex-wrap gap-4">
                                <select name="Semester" className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12">
                                    <option value="select">Select</option>
                                    <option value="first">First</option>
                                    <option value="second">Second</option>
                                </select>
                                <select name="Class" className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12">
                                    <option value="select">Select</option>
                                    <option value="first">First</option>
                                    <option value="second">Second</option>
                                    <option value="third">Third</option>
                                </select>
                                <select name="Section" className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12">
                                    <option value="select">Select</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                </select>
                                <select name="Subject" className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12">
                                    <option value="select">Select</option>
                                    <option value="html">Html</option>
                                    <option value="css">Css</option>
                                    <option value="react">React</option>
                                </select>
                            </div>
                            <div className="flex-shrink-0">
                                <button type="submit" className="bg-[#002749] text-white px-6 py-3 rounded-lg h-12 hover:bg-[#577ce0]">
                                    VIEW
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
                        {/* <!--  Header End --> */}

            {/* <!--  table start --> */}


            <div className="overflow-hidden min-w-full ">
                <table className="min-w-full text-center text-sm font-light ">
                    <thead className="border-b text-white border-[#002749] bg-[#002749]">
                        <tr>
                            <th scope="col" className="px-6 py-4"> # </th>
                            <th scope="col" className="px-6 py-4"> Student </th>
                            <th scope="col" className="px-6 py-4"> Lab1 </th>
                            <th scope="col" className="px-6 py-4"> Lab2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-[#00274991]">
                            <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">1</td>
                            <td className="whitespace-nowrap py-3 text-lg">
                            <p>Hadeer</p>

                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">

                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" />

                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">
                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" />

                            </td>
                        </tr>
                        <tr className="border-b border-[#00274991]">
                            <td className="whitespace-nowrap px-6 font-medium text-2xl text-[#002749]">
                                2
                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">
                            <p>Hadeer</p>

                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">

                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">
                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-[#00274991]">
                            <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                                3
                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">
                            <p>Hadeer</p>

                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">
                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">


                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-[#00274991]">
                            <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                                4
                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">
                            <p>Hadeer</p>

                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">
                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">
                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                        </tr>
                        <tr className="border-b border-[#00274991]">
                            <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                                5
                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">
                            <p>Hadeer</p>

                            </td>

                            <td className="whitespace-nowrap py-3 text-lg">

                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" />
                            </td>
                            <td className="whitespace-nowrap py-3 text-lg">

                                <input
                                    list="choose"
                                    name="choose"
                                    type="Number"
                                    className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <!-- table end --> */}


        </>
    )
}
export default Gard