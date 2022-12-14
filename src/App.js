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
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="/forgetpassword" element={<Forgetpassword/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/userdashboard" element={<UserDashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
