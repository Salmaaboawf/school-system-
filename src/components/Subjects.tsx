import React, { useEffect, useState } from 'react';
import { Button, Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { fetchSubjectsByLevel } from '../services/subjectServices';
import { useAppSelector } from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../assets/style.css';
import { MdCalculate } from 'react-icons/md';
function Subjects() {
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.class_id) {
        const data = await fetchSubjectsByLevel(userInfo.class_id);
        setFilteredSubjects([...data]);
      }
    };

    loadSubjects();
  }, [dispatch, userInfo.class_id]);

  const handleButtonClick = (subjectId: string) => {
    navigate(`/quiz`, { state: { subjectId } });
  };

  return (
    <>
      <Nav />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredSubjects.map((subject) => (

          <section className="card-section">
            <div className="card">
              <div className="flip-card">
                <div className="flip-card__container">
                  <div className="card-front">
                    <div className="card-front__tp card-front__tp--city overflow-hidden">
                     
                      <div className='w-full h-full overflow-hidden'>
                        <img src={subject.photoURL} className='w-full h-full' />
                      </div>
                      {/* <h2 className="card-front__heading">
                        {subject.name}
                      </h2> */}
                    </div>

                    <div className="card-front__bt">
                      <p className="card-front__text-view card-front__text-view--city">
                        View me
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inside-page">
                <div className="inside-page__container">
                  <h3 className="inside-page__heading inside-page__heading--city">
                    {subject.name}
                  </h3>
                  <p className="inside-page__text">
                    {subject.description}
                  </p>
                  <a href="#" className="inside-page__btn inside-page__btn--city" onClick={handleButtonClick}>See Materials</a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default Subjects;
