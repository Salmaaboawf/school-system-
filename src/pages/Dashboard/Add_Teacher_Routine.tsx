import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";

export default function Add_Teacher_Routine() {
  return (
    <div className="container flex gap-x-5  ">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        {/* Header of the section */}
        <div>
          <Header />
        </div>
        {/* Header of the section */}
        <div className="my-5">
        <div className="flex">
      <div className="inline-block lg:w-full py-2 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl text-[#002749] my-3">Teacher Routine</h1>
        {/* <span className="text-2xl">teacher/salma</span> */}

        {/* datalist to choose teacher */}
        <input
          list="selectTeacher"
          name="selectTeacher"
          placeholder="Choose Teacher"
          className="p-1 border text-[#002749] border-[#00274957] rounded block  w-40 my-3"
        />
        <datalist id="selectTeacher" className="text-[#002749]">
          <option value="Mona Ahmed">Mona Ahmed</option>
          <option value="Ahmed Ali">Ahmed Ali</option>
          <option value="Ali Ahmed">Ali Ahmed</option>
          <option value="Salma Ahmed">Salma Ahmed</option>
        </datalist>

        <div className="overflow-hidden min-w-full ">
          <table className="min-w-full text-center text-sm font-light ">
            <thead className="border-b  font-xl text-white bg-[#002749]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Day
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
              {/* sunday row */}
              <tr className="border-b border-[#00274957] text-[#002749]">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                  Sun
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
              </tr>

              {/* monday row */}
              <tr className="border-b border-[#00274957] text-[#002749]">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                  Mon
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-xl">
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
              </tr>

              {/* tuesday row */}
              <tr className="border-b border-[#00274957] text-[#002749]">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                  Tue
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
              </tr>

              {/* wednesday row */}
              <tr className="border-b border-[#00274957] text-[#002749]">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                  {" "}
                  Wed
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
              </tr>

              {/* thursday row */}
              <tr className="border-b border-[#00274957] text-[#002749]">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                  Thr
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>

                <td className="whitespace-nowrap px-6 py-4  text-xl">
                  {/* datalist to choose the class */}
                  <input
                    list="chooseClass"
                    name="chooseClass"
                    placeholder="Choose Class"
                    className="p-2 border text-[#002749] border-[#00274957] rounded w-40"
                  />
                  <datalist id="chooseClass" className="text-[#002749]">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="D1">D1</option>
                    <option value="D2">D2</option>
                    <option value="E1">E1</option>
                    <option value="E2">E2</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                  </datalist>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
