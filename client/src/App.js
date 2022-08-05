import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import API from './API';

import CoursesTable from './components/CoursesTable';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login.js';
import StudyPlan from './components/StudyPlan';

function App() {

  const [typeNav, setTypeNav] = useState(0);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState(Array());

  // Initial load at application startup time
  useEffect(() => {
    const getCourses = async () => {
      const list = await API.readCourses();
      const array = [...list]
      setCourses(list);
      setLoading(false);
    }
    getCourses();
  }, []);

  const setCourseSearch = (name) => {
    setSearch((oldName) => {
      if(loading === false){
        const course = courses.filter(course => course.name.toLowerCase().includes(name.toLowerCase()));
        if(course.length !== 0)
          return course;
        else{
          return [];
        }
      }
    })
  }

  return (
    <BrowserRouter>
      <Row>
        <Col>
          {<NavigationBar typeNav={typeNav} setTypeNav={setTypeNav} setCourseSearch={setCourseSearch} setMessage={setMessage} setLoggedIn={setLoggedIn} />}
        </Col>
      </Row>
      <Row>
        <Col xs={1}></Col>
        <Col>
        {loading === true 
        ? <><br/><br/><br/><div className='d-flex justify-content-center'><Spinner animation='border' size='xl' className='mr-2'/> </div></>
        :
          <Routes>
            <Route index element={!loggedIn && <CoursesTable local={false} courseSearch={search} courses={courses} tag={'normal'} setAdd={'no'}/>}/>
            <Route path='/login' element={<Login setTypeNav={setTypeNav} loggedIn={loggedIn} setLoggedIn={setLoggedIn} message={message} setMessage={setMessage}/>}/>
            <Route path='/studyPlan' element={loggedIn && <StudyPlan setMessage={setMessage} setTypeNav={setTypeNav} loggedIn={loggedIn} setLoggedIn={setLoggedIn} courseSearch={search} />}/>
          </Routes>
        }
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
