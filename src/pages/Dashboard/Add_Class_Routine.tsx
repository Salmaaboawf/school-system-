
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
const Add_Class_Routine = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-gray-100 min-h-screen p-4">
      <div className="lg:w-1/4 bg-white shadow-lg rounded-lg">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        {/* Header of the section */}
        <div>
          <Header />
        </div>
        {/* Header of the section */}
        <div className="my-5">
        <div className="inline-block min-w-90 w-full py-2 sm:px-6 lg:px-8 ">
      <h3 className="text-3xl my-4 text-[#002749]">Add Classs Routine</h3>
      <p className="text-xl mb-3">
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
      </p>
      <div className="overflow-hidden min-w-full ">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border-b text-white border-[#002749] bg-[#002749]">
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
            <tr className="border-b border-[#00274991]">
              <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                Sun
              </td>
              {/* td for period 7-9 sunday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40 "
                />
                <datalist id="chooseSubject" className="text-[#002749]">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher" className="text-[#002749]">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

               {/* td for period 9-11 sunday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

              
               {/* td for period 11-1 sunday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

            </tr>
            <tr className="border-b border-[#00274991]">
              <td className="whitespace-nowrap px-6 font-medium text-2xl text-[#002749]">
                Mon
              </td>
               {/* td for period 7-9 monday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

               {/* td for period 9-11 monday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

              
               {/* td for period 11-1 monday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>
            </tr>
            <tr className="border-b border-[#00274991]">
              <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                Tue
              </td>
           {/* td for period 7-9 tuesday*/}
           <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

               {/* td for period 9-11 tuesday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

              
               {/* td for period 11-1 tuesday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>
            </tr>
            <tr className="border-b border-[#00274991]">
              <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                Wed
              </td>
              {/* td for period 7-9 wednesday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

               {/* td for period 9-11 wednesday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

              
               {/* td for period 11-1 wednesday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>
            </tr>
            <tr className="border-b border-[#00274991]">
              <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                Thr
              </td>
              
              {/* td for period 7-9 thursday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

               {/* td for period 9-11 thursday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
                </datalist>
              </td>

              
               {/* td for period 11-1 thursday*/}
              <td className="whitespace-nowrap py-3 text-lg">
                {/* datalist to choose subjects */}
                <input
                  list="chooseSubject"
                  name="chooseSubject"
                  placeholder="Choose Subject"
                  className="p-1 border text-[#002749] border-[#00274957] rounded mb-2 block m-auto w-40"
                />
                <datalist id="chooseSubject">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="German">German</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Arts">Arts</option>
                </datalist>

                {/* datalist to choose teacher */}
                <input
                  list="chooseTeacher"
                  name="chooseTeacher"
                  placeholder="Choose Teacher"
                  className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40" 
                />
                <datalist id="chooseTeacher">
                  <option value="Mona Ahmed">Mona Ahmed</option>
                  <option value="Ahmed Ali">Ahmed Ali</option>
                  <option value="Ali Ahmed">Ali Ahmed</option>
                  <option value="Salma Ahmed">Salma Ahmed</option>
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
  );
};

export default Add_Class_Routine;

