import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import Header from '../../components/Header/Header'
import Footer from '../../components/about/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getKids } from '../../Redux/Slices/KidsSlice'
import { useAppSelector } from '../../hooks/reduxHooks'
import { fetchSchedule } from '../../services/scheduleServices'
import Loading from '../../components/Loading'
// import HashLoader from "react-spinners/HashLoader"

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "#ff4e31",
// };
function KidsSchedule() {

  const dispatch = useDispatch();
  const kids = useSelector((state) => state.kids.kidsList);
  const [selectedKid, setSelectedKid] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userInfo = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const parentId = userInfo.id
    if (parentId) {
      dispatch(getKids(parentId));
    }
  }, []);


  const handleViewSchedule = async (e) => {
    e.preventDefault();
    if (selectedKid) {
      // console.log(selectedKid)
      setLoading(true);
      try {
        // Assuming level_id is part of the kid's data
        const kid = kids.find(kid => kid.id === selectedKid);
        if (kid && kid.class_id) {
          const fetchedSchedule = await fetchSchedule(kid.class_id);
          setSchedule(fetchedSchedule.days);
          setError(null);
        } else {
          setError("No level information available for the selected kid.");
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setError("Failed to fetch schedule. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <div>
        <Nav />
      </div>
      <div className='container'>
        <div className="forms rounded-lg ">
          <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Hello {userInfo.gender == 'male' ? 'Mr ' : "Mrs "}{userInfo.name}</h2>
            <form
              onSubmit={handleViewSchedule}
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

        {!selectedKid && <p className='noData'>Please select a kid to view their Schedule.</p>}
        {selectedKid && schedule.length === 0 && !loading && !error && (
          <p className='noData'>No Schedule available for the selected kid.</p>
        )}

        {schedule.length > 0 && (
          <table className="min-w-full text-center font-light rounded-2xl mt-4 xs:overflow-x-auto">
            <thead className="tHead">
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
                <th scope="col" className="px-6 py-4">
                  1:00-3:00
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((day, dayIndex) => (
                <tr key={dayIndex} className="border-b dark:border-neutral-500 bg-slate-50  text-Orange hover:bg-lightBlue hover:text-white">
                  <td className="dayName">
                    {day.dayName}
                  </td>
                  {['7:00-9:00', '9:00-11:00', '11:00-1:00', '1:00-3:00'].map((timeSlot, index) => {



                    return (
                      <td key={index} className="whitespace-nowrap px-6 py-4 text-xl">
                        <div className="flex flex-col">
                          {day.subjects.length > index ? (
                            <>
                              <span>{day.subjects[index].subjectName || 'No class'}</span>
                              <span>{day.subjects[index].teacherName || 'No teacher available'}</span>
                            </>
                          ) : (
                            <span>No class</span>
                          )}
                        </div>
                      </td>

                    )
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
      <Footer />
    </>
  )
}

export default KidsSchedule