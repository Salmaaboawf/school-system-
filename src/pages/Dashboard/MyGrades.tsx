import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../hooks/reduxHooks";
import { fetchSubjectsGrades } from "../../services/gradeServices";
import Loading from "../../components/Loading";
import ParticlesComponent from "../../components/Tsparticles";
import Nav from "../../components/Nav";

function MyGrades() {
  const userInfo = useAppSelector((state) => state.user.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const gradesArray = await fetchSubjectsGrades(userInfo.id);
        setGrades(gradesArray);
        console.log(grades)
      } catch (error) {
        setError("Failed to fetch grades.");
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, [userInfo.id]);

  if (loading) {
    return <Loading />
  }


  return (
    <div className="container flex gap-x-5">
      {/* <div>
        <Nav />
      </div> */}
      <div className="flex-[4]">
        <ParticlesComponent id="particles" />
        <div className="mt-10">

          <Header />
        </div>
        <div className="my-5">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-0 text-[#002749]">
            {
              <div className="overflow-hidden min-w-full">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b font-medium text-white bg-[#002749] border-[#002749]">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-2xl">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-4 text-2xl">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-4 text-2xl">
                        Quiz Score
                      </th>
                      <th scope="col" className="px-6 py-4 text-2xl">Total Grade</th>
                      <th scope="col" className="px-6 py-4 text-2xl">Rating</th>
                    </tr>
                  </thead>

                  <tbody>
                    {grades.map((item, index) => {
                      const finalGrade = parseFloat(item.grade + item.quizScore)
                      let rating = '';
                      switch (true) {
                        case finalGrade >= 90:
                          rating = 'Excellent';
                          break;
                        case finalGrade >= 80:
                          rating = 'Very Good';
                          break;
                        case finalGrade >= 70:
                          rating = 'Good';
                          break;
                        case finalGrade >= 60:
                          rating = 'Average';
                          break;
                        default:
                          rating = 'Poor';
                      }
                      return (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                            {item?.subjectName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-2xl">
                            {item?.grade}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-2xl">
                            {item?.quizScore}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-2xl">
                            {finalGrade}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-2xl">
                            {rating}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyGrades;
