import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Select, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
  addQuestion,
  addSubjectQuizes,
  fetchSubjectsByteacher_id,
} from "../../services/subjectServices";
import {
  clearQuizQuestions,
  getQuizQuestions,
} from "../../services/quizServices";
import Header from "../../components/Header/Header";

// Validation Schema
const schema = yup.object().shape({
  question: yup
    .string()
    .required("Required")
    .max(200, "Question cannot exceed 200 characters")
    .min(3, "Min is 3 letters"),
  options: yup.array().of(
    yup.object().shape({
      value: yup
        .string()
        .required("Option is required")
        .max(100, "Option cannot exceed 100 characters"),
    })
  ),
  correctOption: yup.string().required("You must select the correct option"),
});

export default function AddQuiz() {
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const userInfo = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.id) {
        const subjectsData = await fetchSubjectsByteacher_id(userInfo.id);
        setFilteredSubjects([...subjectsData]);
      }
    };

    loadSubjects();
  }, [userInfo.id]);

  const handleInputChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);

    getQuizQuestions(selectedSubject, (questionsData) => {
      setQuizQuestions([...questionsData]);
      console.log(questionsData);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "options",
  });

  const save = async (data) => {
    try {
      const quizData = {
        question: data.question,
        options: data.options.map((option) => option.value),
        correctAnswer: data.correctOption,
        subjectId: subject,
      };

      console.log(quizData);

      await addQuestion(quizData);
      reset();
    } catch (error) {
      console.error("Error adding quiz: ", error);
    }
  };

  return (
    <div className="container xs:px-0 lg:px-20">
      {/* Ensuring the Chat component is always on top */}
   

      <div className="mt-10">
        <Header />
      </div>
      <div className="flex gap-x-5">
        <div className="my-5 w-full">
          <section className="shadow-md text-deepBlue">
            <h3 className="bg-[#002749] text-white font-bold py-4 pl-4 text-lg rounded-t-lg">
              Add Quiz Question
            </h3>
            <form
              onSubmit={handleSubmit(save)}
              className="py-4 w-full sm:px-10 xs:px-5 rounded-b-lg"
            >
              <div className="mb-4">
                <div className="flex justify-between mb-4 pr-1">
                  <Label
                    htmlFor="subject"
                    value="Subject Name"
                    className="text-xl"
                  />

                  <Label
                    htmlFor="subject"
                    value={`Current Questions ${quizQuestions.length}`}
                    className="text-xl"
                  />
                </div>
                <Select
                  id="subject"
                  required
                  value={subject}
                  onChange={handleInputChange}
                >
                  <option value="">Select subject</option>
                  {filteredSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="mb-4">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                  id="question"
                  placeholder="Question"
                  {...register("question")}
                />
                <p className="text-red-500">{errors.question?.message}</p>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="mb-4">
                  <label htmlFor={`option${index + 1}`}>
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                    id={`option${index + 1}`}
                    placeholder={`Option ${index + 1}`}
                    {...register(`options.${index}.value`)}
                  />
                  <p className="text-red-500">
                    {errors.options?.[index]?.value?.message}
                  </p>
                </div>
              ))}

              <div className="mb-4">
                <Label htmlFor="correctOption" value="Correct Option" />
                <Select id="correctOption" {...register("correctOption")}>
                  <option value="">Select Correct Option</option>
                  {fields.map((_, index) => (
                    <option key={index} value={index.toString()}>
                      Option {index + 1}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.correctOption?.message}</p>
              </div>

              <div className="sm:flex-row sm:flex sm:gap-x-4 mx-auto w-fit xs:flex-col xs:gap-x-1">
                <Button
                  outline
                  className="my-5 lg:w-72 sm:w-32 xs:w-72"
                  type="submit"
                >
                  Add Question to the Quiz
                </Button>
                <Button
                  outline
                  className="my-5 lg:w-72 sm:w-32 xs:w-72"
                  type="button"
                  onClick={() => {
                    clearQuizQuestions(subject);
                  }}
                >
                  Clear Quiz
                </Button>

                <Button
                  outline
                  className="my-5 lg:w-72 sm:w-32 xs:w-72"
                  type="button"
                  onClick={() => {
                    addSubjectQuizes();
                  }}
                >
                  Add loop
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
