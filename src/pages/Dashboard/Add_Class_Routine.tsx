/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import ReactSelect from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { fetchSubjects } from "../../services/subjectServices";
import { Button } from "flowbite-react";
import { SubjectType, TeacherType } from "../../utils/types";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { fetchTeachers } from "../../services/userServices";

const schema = yup.object().shape({
  levels: yup.object().required().nullable(),
  sunOne: yup.object().required().nullable(),
  sunTwo: yup.object().required().nullable(),
  sunThree: yup.object().required().nullable(),
  monOne: yup.object().required().nullable(),
  monTwo: yup.object().required().nullable(),
  monThree: yup.object().required().nullable(),
  tueOne: yup.object().required().nullable(),
  tueTwo: yup.object().required().nullable(),
  tueThree: yup.object().required().nullable(),
  wedOne: yup.object().required().nullable(),
  wedTwo: yup.object().required().nullable(),
  wedThree: yup.object().required().nullable(),
  thrOne: yup.object().required().nullable(),
  thrTwo: yup.object().required().nullable(),
  thrThree: yup.object().required().nullable(),
});

const animatedComponents = makeAnimated();

// Define the type for individual level
interface Level {
  id: string;
  name: string;
}

const Add_Class_Routine = () => {
  const levels: Level[] = useAppSelector((state) => state.levels.levels);
  const subjects: SubjectType[] = useAppSelector(
    (state) => state.subject.subject
  );
  const [currentLevel, setCurrentLevel] = useState<any>({});
  const [levelSubjects, setLevelSubjects] = useState<any>([]);
  const [teachers, setTeachers] = useState<TeacherType[] | any>([]);

  const dispatch = useAppDispatch();

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
          <div className="inline-block min-w-90 w-full py-2 sm:px-6 lg:px-8 ">
            <h3 className="text-3xl my-4 text-[#002749]">Add Classs Routine</h3>

            <div className="overflow-hidden min-w-full ">
              <form onSubmit={handleSubmit(addSchedHandler)}>
                <div className="text-xl mb-3">
                  <Controller
                    name="levels"
                    control={control}
                    render={({ field }) => (
                      <ReactSelect
                        {...field}
                        options={levels}
                        components={animatedComponents}
                        placeholder="Choose Levels"
                        getOptionLabel={(item: any) => item.name}
                        getOptionValue={(item: any) => `${item.id}`}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setCurrentLevel(selectedOption);
                          reset({
                            levels: selectedOption,
                            sunOne: null,
                            sunTwo: null,
                            sunThree: null,
                            monOne: null,
                            monTwo: null,
                            monThree: null,
                            tueOne: null,
                            tueTwo: null,
                            tueThree: null,
                            wedOne: null,
                            wedTwo: null,
                            wedThree: null,
                            thrOne: null,
                            thrTwo: null,
                            thrThree: null,
                          });
                        }}
                      />
                    )}
                  />
                </div>
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
                        <Controller
                          name="sunOne"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 9-11 sunday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose subjects */}
                        <Controller
                          name="sunTwo"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 11-1 sunday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="sunThree"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#00274991]">
                      <td className="whitespace-nowrap px-6 font-medium text-2xl text-[#002749]">
                        Mon
                      </td>
                      {/* td for period 7-9 monday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="monOne"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 9-11 monday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="monTwo"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 11-1 monday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="monThree"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#00274991]">
                      <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                        Tue
                      </td>
                      {/* td for period 7-9 tuesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="tueOne"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 9-11 tuesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="tueTwo"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 11-1 tuesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="tueThree"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                                console.log(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#00274991]">
                      <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                        Wed
                      </td>
                      {/* td for period 7-9 wednesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="wedOne"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 9-11 wednesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="wedTwo"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 11-1 wednesday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="wedThree"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[#00274991]">
                      <td className="whitespace-nowrap px-6  font-medium text-2xl text-[#002749]">
                        Thr
                      </td>

                      {/* td for period 7-9 thursday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="thrOne"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 9-11 thursday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="thrTwo"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>

                      {/* td for period 11-1 thursday*/}
                      <td className="whitespace-nowrap py-3 text-lg">
                        {/* datalist to choose levelSubjects */}
                        <Controller
                          name="thrThree"
                          control={control}
                          render={({ field }) => (
                            <ReactSelect
                              {...field}
                              options={levelSubjects}
                              components={animatedComponents}
                              placeholder="Choose Subject"
                              getOptionLabel={(item: any) => item.name}
                              getOptionValue={(item: any) => `${item.id}`}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions);
                              }}
                            />
                          )}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full flex items-center justify-center my-10">
                  <Button
                    outline
                    gradientDuoTone="pinkToOrange"
                    className="my-5 w-72"
                    type="submit"
                  >
                    Add Schedule
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Class_Routine;
