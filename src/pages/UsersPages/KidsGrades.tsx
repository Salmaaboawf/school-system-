import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/about/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getKids } from '../../Redux/Slices/KidsSlice'
import { useAppSelector } from '../../hooks/reduxHooks'
import { fetchSubjectsGrades } from '../../services/gradeServices'
import Loading from '../../components/Loading'


function KidsGrades() {
  const dispatch = useDispatch();
  const kids = useSelector((state) => state.kids.kidsList)
  const userInfo = useAppSelector((state) => state.user.user);
  const [selectedKid, setSelectedKid] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    const parentId = userInfo.id
    if (parentId) {
      dispatch(getKids(parentId));
    }
  }, [dispatch, userInfo.id]);

  const handleViewGrades = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (selectedKid) {
      setLoading(true);
      try {
        const fetchedGrades = await fetchSubjectsGrades(selectedKid);
        setGrades(fetchedGrades);
        setError(null);
      } catch (error) {
        setError("Failed to fetch grades. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if(loading){
    return   <Loading />
  }

  return (
    <>

    <div className='container'> 

      <div className="forms rounded-lg ">
        <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
          {/* <h2 className="text-2xl font-semibold mb-6">My Kids</h2> */}
          <h2 className="text-2xl font-semibold mb-4">Hello {userInfo.gender=='male'?'Mr ':"Mrs "}{userInfo.name}</h2>
          <form
            onSubmit={handleViewGrades}
            className="flex items-center space-x-4"
          >
            <div className="flex flex-grow flex-wrap gap-4">

              <select value={selectedKid} onChange={(e) => setSelectedKid(e.target.value)} className='w-52'>
              <option value="" disabled>Select a kid</option>
                {kids.map((kid) => (
                  <option key={kid.id} value={kid.id}>{kid.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="bg-[#002749] text-white px-6 py-3 rounded-lg h-12 hover:bg-[#577ce0]"
              >
                VIEW
              </button>
            </div>
          </form>
        </div>
      </div>
      {!isSubmitted && !selectedKid && <p className='noData'>Please select a kid to view their grades.</p>}
      {/* {!selectedKid && <p className='noData'>Please select a kid to view their grades.</p>} */}
      {selectedKid && grades.length === 0 && !loading && !error && (
          <p className='noData'>No grades available for the selected kid.</p>
        )}
          {grades.length > 0 && (
            <table className="min-w-full text-center text-sm font-light mt-6">
              <thead className="border-b font-medium text-white bg-[#002749] border-[#002749]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-2xl">Subject</th>
                  <th scope="col" className="px-6 py-4 text-2xl">Grade</th>
                  <th scope="col" className="px-6 py-4 text-2xl">Quiz</th>
                  <th scope="col" className="px-6 py-4 text-2xl">Total Grade</th>
                  <th scope="col" className="px-6 py-4 text-2xl">Rating</th>
                </tr>
              </thead>
              <tbody>


{grades.map((item) => {
  // Calculate final grade by adding grade and quiz score for each item
  // const finalGrade = parseFloat(item.grade) + parseFloat(item.quizScore) || 0;
  const grade = parseFloat(item.grade) || 0;
  const quizScore = parseFloat(item.quizScore) || 0;

  // If either `item.grade` or `item.quizScore` is empty, use the one that has a value
  const finalGrade = (item.grade && item.quizScore) 
  ? grade + quizScore  // If both are provided, sum them
  : (item.grade ? grade : quizScore);  
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
    <tr key={item.id} className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">{item.subjectName}</td>
      <td className="whitespace-nowrap px-6 py-4 text-2xl">{item.grade}</td>
      <td className="whitespace-nowrap px-6 py-4 text-2xl">{item.quizScore}</td>
      <td className="whitespace-nowrap px-6 py-4 text-2xl">{finalGrade}</td> {/* Display calculated final grade */}
      <td className="whitespace-nowrap px-6 py-4 text-2xl">{rating}</td>
    </tr>
  );
})}

              </tbody>
            </table>
          )}
      </div>
      <Footer />
    </>
  )
}

export default KidsGrades