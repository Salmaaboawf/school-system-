import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav'
import Footer from '../../components/about/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getKids } from '../../Redux/Slices/KidsSlice'
import { useAppSelector } from '../../hooks/reduxHooks'
import { fetchSubjectsGrades } from '../../services/gradeServices'

function KidsGrades() {
  const dispatch = useDispatch();
  const kids = useSelector((state) => state.kids.kidsList)
  const userInfo = useAppSelector((state) => state.user.user);
  const [selectedKid, setSelectedKid] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const parentId = userInfo.id
    if (parentId) {
      dispatch(getKids(parentId));
    }
  }, []);

  const handleViewGrades = async (e) => {
    e.preventDefault();
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

  return (
    <>
      <Nav />
      <Header />
      <div className="forms p-6 rounded-lg ">
        <div className="form max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">My Kids</h2>
          <form
            onSubmit={handleViewGrades}
            className="flex items-center space-x-4"
          >
            <div className="flex flex-grow flex-wrap gap-4">

              <select value={selectedKid} onChange={(e) => setSelectedKid(e.target.value)}>
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

      {loading && <p>Loading grades...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {grades.length > 0 && (
            <table className="min-w-full text-center text-sm font-light mt-6">
              <thead className="border-b font-medium text-white bg-[#002749] border-[#002749]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-2xl">Subject</th>
                  <th scope="col" className="px-6 py-4 text-2xl">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((item) => (
                  <tr key={item.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">{item.subjectName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-2xl">{item.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {grades.length === 0 && !loading && !error && <p>No grades available for the selected kid.</p>}
      <Footer />
    </>
  )
}

export default KidsGrades