import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Config } from './Config'
import { FaTimes } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from "react-router-dom"



function UserDashboard() {
  const navigate = useNavigate()

  const [collapse, setCollapse] = useState(true)


  const handleClick = () => {
    setCollapse(false)
  }
  const handleclose = () => {
    setCollapse(true)
  }



  const logout = () => {
    localStorage.removeItem("exam")
    localStorage.removeItem("name")
    navigate("/")
  }

  const home = () => {
    navigate("/admindashboard/adminchart")
  }
  return (
    <>
      {/* navbar */}
      <nav class="navbar navbar-expand-lg bg-light user ">
        <div class="container-fluid">
          <Link to="/admindashboard/adminchart" class="navbar-brand" href="#" style={{ color: "white", cursor: "pointer" }}>Exam Seating Arrangement</Link>
          {
            collapse ? <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
              <span class="navbar-toggler-icon"></span>
            </button> :
              <button class="navbar-toggler close" type="button" onClick={handleclose}>
                <span><FaTimes /></span>
              </button>
          }

          <div class={`${collapse ? "collapse" : ""} navbar-collapse navcoll`} id="navbarNavDropdown">
           
            <ul class="navbar-nav">

              <li class="nav-item">
                <a class="nav-link" href="#" onClick={home}>Home</a>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hall Details
                </a>
                <ul class="dropdown-menu">
                  <li><Link to="/admindashboard/adminhall/empty" onClick={handleclose} class="dropdown-item" >Create Hall</Link></li>
                  <li><Link to="/admindashboard/adminviewhall" onClick={handleclose} class="dropdown-item" >view</Link></li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Staff Details
                </a>
                <ul class="dropdown-menu">
                  <li><Link to="/admindashboard/adminstaff/empty" onClick={handleclose} class="dropdown-item" href="#">Create Staff</Link></li>
                  <li><Link to="/admindashboard/adminviewstaff" onClick={handleclose} class="dropdown-item" href="#">view</Link></li>
                </ul>

              </li>

              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Student Details
                </a>
                <ul class="dropdown-menu">
                  <li><Link to="/admindashboard/adminstudent/empty" onClick={handleclose} class="dropdown-item" href="#">Create Student</Link></li>
                  <li><Link to="/admindashboard/adminviewstudent" onClick={handleclose} class="dropdown-item" href="#">view</Link></li>
                </ul>

              </li>

              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Exam Details
                </a>
                <ul class="dropdown-menu">
                  <li><Link to="/admindashboard/adminaddexam/empty" onClick={handleclose} class="dropdown-item" href="#">Create Exam</Link></li>
                  <li><Link to="/admindashboard/adminviewexam" onClick={handleclose} class="dropdown-item" href="#">view</Link></li>
                </ul>

              </li>

              <li class="nav-item">
                <a class="nav-link" href="#" onClick={logout}>Logout</a>
              </li>

            </ul>

          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
}

export default UserDashboard