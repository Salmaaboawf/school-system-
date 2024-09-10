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
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

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

    const createdDocs = [];

    try {
      console.log(e.levels.id);

      // Create a document reference with the custom ID (level_id)
      const docRef = doc(db, "schedules", e.levels.id);
      await setDoc(docRef, { level_id: e.levels.id });
      createdDocs.push(docRef); // Track created document
      console.log("Document written with ID: ", docRef.id);

      // Fetch existing schedules to check for conflicts
      const existingSchedulesRef = collection(db, "schedules");
      const existingSchedulesSnapshot = await getDocs(existingSchedulesRef);

      const existingScheduleMap: any = {};

      for (const scheduleDoc of existingSchedulesSnapshot.docs) {
        const scheduleDaysRef = collection(scheduleDoc.ref, "days");

        const daysSnapshot = await getDocs(scheduleDaysRef);
        for (const dayDoc of daysSnapshot.docs) {
          const subjectsRef = collection(dayDoc.ref, "schedule_subjects");

          const subjectsSnapshot = await getDocs(subjectsRef);
          for (const subjectDoc of subjectsSnapshot.docs) {
            const subjectData = subjectDoc.data();
            if (!existingScheduleMap[dayDoc.id]) {
              existingScheduleMap[dayDoc.id] = [];
            }
            existingScheduleMap[dayDoc.id].push(subjectData);
          }
        }
      }

      // Sub-collection days
      for (let i = 0; i < 5; i++) {
        const dayRef = doc(db, "schedules", e.levels.id, "days", days[i].name);
        await setDoc(dayRef, { id: dayRef.id, name: days[i].name });
        createdDocs.push(dayRef); // Track created document

        const scheduleSubjectsRef = collection(dayRef, "schedule_subjects");

        // Create 3 documents inside the "schedule_subjects" sub-collection
        for (let j = 0; j < 3; j++) {
          const subjectId = days[i].ids[j];
          console.log(subjectId);

          // Find the teacher who is responsible for this subject
          const teachersSnapshot = await getDocs(collection(db, "teachers"));
          const subjectTeacher = teachersSnapshot.docs.find((teacherDoc) => {
            const teacherData = teacherDoc.data() as TeacherType;
            return teacherData.subjects?.includes(subjectId);
          });

          if (subjectTeacher) {
            // Check for conflicts
            const conflict = existingScheduleMap[days[i].name]?.some(
              (existingSubject: { teacher_id: string; }) =>
                existingSubject.teacher_id === subjectTeacher.id
            );

            if (conflict) {
              console.log(
                `Conflict detected with Teacher ${subjectTeacher.name}`
              );
              await deleteScheduleDocument(docRef, e.levels.id); // Delete document and sub-collections
              throw new Error(
                `Teacher ${subjectTeacher.name} already has a schedule at ${days[i].name}`
              );
            }

            const subjectDocRef = doc(scheduleSubjectsRef, `subject${j + 1}`);
            await setDoc(subjectDocRef, {
              order: j.toString(),
              subject_id: subjectId,
              teacher_id: subjectTeacher.id,
            });

            createdDocs.push(subjectDocRef); // Track created document

            // Update the teacher's document with the new subject and schedule
            const teacherRef = doc(db, "teachers", subjectTeacher.id);
            await updateDoc(teacherRef, {
              schedule: arrayUnion({
                level_id: e.levels.id,
                day: days[i].name,
                subject_id: subjectId,
                order: j.toString(),
              }),
            });
          }
        }
      }
      console.log("Finished adding");
    } catch (error) {
      console.error("Error adding schedule: ", error);
    }
  };

  // Helper function to recursively delete the document and its sub-collections
  const deleteScheduleDocument = async (docRef: any, levelId: string) => {
    try {
      // Delete the sub-collection "days" and all "schedule_subjects" inside it
      const daysCollectionRef = collection(db, "schedules", levelId, "days");
      const daysSnapshot = await getDocs(daysCollectionRef);

      for (const dayDoc of daysSnapshot.docs) {
        const scheduleSubjectsCollectionRef = collection(
          dayDoc.ref,
          "schedule_subjects"
        );
        const scheduleSubjectsSnapshot = await getDocs(
          scheduleSubjectsCollectionRef
        );

        // Delete all documents in "schedule_subjects"
        for (const subjectDoc of scheduleSubjectsSnapshot.docs) {
          await deleteDoc(subjectDoc.ref);
        }

        // Delete the day document after its sub-collection is deleted
        await deleteDoc(dayDoc.ref);
      }

      // Finally, delete the main schedule document
      await deleteDoc(docRef);
      console.log(`Successfully deleted schedule document: ${docRef.id}`);
    } catch (error) {
      console.error(`Error deleting schedule document ${docRef.id}: `, error);
    }
  };

  useEffect(() => {
    fetchSubjects(dispatch);
    // const getTeachers = async () => {
    //   const teachersList = await fetchTeachers();
    // };
    // getTeachers();
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
