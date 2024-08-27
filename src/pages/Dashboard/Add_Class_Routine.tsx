/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import ReactSelect from "react-select";

import { useAppSelector } from "../../hooks/reduxHooks";
const Add_Class_Routine = () => {
  const levels: Level[] = useAppSelector((state) => state.levels.levels);
  const subjects: SubjectType[] = useAppSelector(
    (state) => state.subject.subject
  );
  const [currentLevel, setCurrentLevel] = useState<any>({});
  const [levelSubjects, setLevelSubjects] = useState<any>([]);
  const [teachers, setTeachers] = useState<TeacherType[] | any>([]);

  const dispatch = useAppDispatch();
  console.log("test");

  const {
    handleSubmit,
    // formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addSchedHandler = async (e: any) => {
    const days = [
      {
        name: "sunday",
        ids: [`${e.sunOne.id}`, `${e.sunTwo.id}`, `${e.sunThree.id}`],
      },
      {
        name: "monday",
        ids: [`${e.monOne.id}`, `${e.monTwo.id}`, `${e.monThree.id}`],
      },
      {
        name: "tuesday",
        ids: [`${e.tueOne.id}`, `${e.tueTwo.id}`, `${e.tueThree.id}`],
      },
      {
        name: "wednesday",
        ids: [`${e.wedOne.id}`, `${e.wedTwo.id}`, `${e.wedThree.id}`],
      },
      {
        name: "thursday",
        ids: [`${e.thrOne.id}`, `${e.thrTwo.id}`, `${e.thrThree.id}`],
      },
    ];

    try {
      console.log(e.levels.id);
      const docRef = await addDoc(collection(db, "schedules"), {
        level_id: e.levels.id,
      });
      const docId = docRef.id;
      await updateDoc(docRef, { id: docId });
      console.log("Document written with ID: ", docRef.id);

      // sub collection days
      for (let i = 0; i < 5; i++) {
        const dayRef = doc(db, "schedules", docId, "days", days[i].name);
        await setDoc(dayRef, {
          id: dayRef.id,
          name: days[i].name,
        });

        const scheduleSubjectsRef = collection(dayRef, "schedule_subjects");

        // Create 3 documents inside the "schedule_subjects" subcollection
        for (let j = 0; j < 3; j++) {
          const subjectTeacher = teachers.find(
            (t: TeacherType) => t.subject == days[i].ids[j]
          );
          const subjectDocRef = doc(scheduleSubjectsRef, `subject${j + 1}`);
          await setDoc(subjectDocRef, {
            order: j.toString(),
            subject_id: days[i].ids[j], // You can set actual values here
            teacher_id: subjectTeacher.id, // You can set actual values here
          });
        }
      }
      console.log("finished added");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects(dispatch);
    const getTeachers = async () => {
      const teachersList = await fetchTeachers();
      setTeachers(teachersList);
    };
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentLevel) {
      const levelSubjs = subjects.filter(
        (sub) => sub.level_id === currentLevel.id
      );
      setLevelSubjects(levelSubjs);
    }
  }, [currentLevel, subjects]);

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
              {/* <ReactSelect
        className="basic-single"
        classNamePrefix="select"
        defaultValue={colourOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={colourOptions}
      /> */}
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
