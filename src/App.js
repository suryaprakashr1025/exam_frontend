import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import ChangePassword from './Changepassword';
import Forgetpassword from './Forgetpassword';

import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

import Adminchart from './Adminchart';

import Adminaddhall from './Adminaddhall';
import Adminviewhall from './Adminviewhall';

import Adminaddstaff from './Adminaddstaff';
import Adminviewstaff from './Adminviewstaff';

import Adminaddstudent from './Adminaddstudent';
import Adminviewstudent from './Adminviewstudent';

import Adminaddexam from './Adminaddexam';
import Adminviewexam from './Adminviewexam';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        
        <Route path="/userdashboard" element={<UserDashboard />} />

        <Route path="/admindashboard" element={<AdminDashboard />}>

          <Route path="/admindashboard/adminchart" element={<Adminchart />} />

          <Route path="/admindashboard/adminhall/:hallid" element={<Adminaddhall />} />
          <Route path="/admindashboard/adminviewhall" element={<Adminviewhall />} />
       

          <Route path="/admindashboard/adminstaff/:staffid" element={<Adminaddstaff />} />
          <Route path="/admindashboard/adminviewstaff" element={<Adminviewstaff />} />
         
          <Route path="/admindashboard/adminstudent/:studentid" element={<Adminaddstudent />} />
          <Route path="/admindashboard/adminviewstudent" element={<Adminviewstudent />} />
         
          <Route path="/admindashboard/adminaddexam/:examid" element={<Adminaddexam />} />
          <Route path="/admindashboard/adminviewexam" element={<Adminviewexam />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
