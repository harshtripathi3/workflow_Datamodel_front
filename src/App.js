import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './services/Home'
import AddTask from './services/AddTask';
import Adminmain from './services/AdminMain';
import Admincr from './services/Admincreate';
import Tasks from './services/Tasks';
import AddAction from './services/AddAction';
import UserMain from './services/UserMain';
import UsertaskIns from './services/UsertaskIns';
import PrevTask from './services/PreviousTask';
import TaskIns from './services/TaskIns';

const App = () => {
  return (
    <div>
    {
        <Router>
          <NavBar/>
          <Routes>
          <Route exact path="/" element={<Home/>} /> 
          <Route exact path="/addtask/:id" element={<AddTask />} />
          <Route exact path="/adminmain" element={<Adminmain />} />
          <Route exact path="/admincr" element={<Admincr />} />
          <Route exact path="/viewtask/:id" element={<Tasks />} />
          <Route exact path="/addaction/:wid/:tid" element={<AddAction />} />
          <Route exact path="/usermain/:id" element={<UserMain />} /> 
          <Route exact path="/userins/:id" element={<UsertaskIns />} />
          <Route exact path='/prevtask/:id' element={<PrevTask/>} />
          <Route exact path='/taskins/:id' element={<TaskIns/>} />
          </Routes>
        </Router>
      }
      

    </div>
  )
}
export default App;
