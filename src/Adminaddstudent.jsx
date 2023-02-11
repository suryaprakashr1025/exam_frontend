import React from 'react'
import { Config } from './Config'
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

function Adminaddstudent() {

  const currentYear = new Date()
  const year = currentYear.getFullYear()

  let years = []

  for (let i = 1; i <= 3; i++) {
    years.push("6-" + (year - i))
  }

  let dept = ["B.sc Computer Science", "B.sc Information Technology", "B.A English", "B.A Tamil", "Bachelor of Commerce", "BACHELOR OF COMMERCE COMPUTER APPLICATIONS", "B.sc Zoology", "B.sc Botony", "B.sc Chemistry", "B.sc Maths", "B.sc Physics"]

  const Formik = useFormik({

    initialValues: {
      name: "",
      phone: "",
      email: "",
      joinyear: "",
      department: "",
      gender: ""
    },
    validate: (values) => {
      const errors = {}
      if (!values.name) {
        errors.name = "Please enter the name"
      } else if (values.name.length <= 2 || values.name.length >= 15) {
        errors.name = "Please enter the 3 to 15 characters"
      }

      if (!values.phone) {
        errors.phone = "Please enter the phone"
      } else if (isNaN(values.phone)) {
        errors.phone = "Please enter only number"
      } else if (values.phone.length !== 10) {
        errors.phone = "Please enter the 10 number"
      }

      if (!values.email) {
        errors.email = "Please enter the email"
      } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Please enter the valid email"
      }



      if (!values.joinyear) {
        errors.joinyear = "Please select the joinyear"
      } else if (values.joinyear === "") {
        errors.joinyear = "Please select the joinyear"
      }

      if (!values.department) {
        errors.department = "Please select the department"
      } else if (values.department === "") {
        errors.department = "Please select the department"
      }

      if (!values.gender) {
        errors.gender = "Please select the gender"
      } else if (values.gender === "") {
        errors.gender = "Please select the gender"
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        var users = await axios.post(`${Config.api}/createstudent`, values)
        console.log(users)
        Formik.resetForm()
      }
      catch (error) {
        alert("error")
      }
    }
  }
  )


  return (
    <div class="container mt-5 p-4" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>

      <div className='col-lg-12 text-center mb-5' >
        <label style={{ fontSize: "22px", color: " rgb(129, 80, 221)" }}>Add Student</label>
      </div>

      <form onSubmit={Formik.handleSubmit} class="form-group">

        <div class="row">

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>Name</label>
              <input
                name="name"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.name}
                type={"text"}
                class={`form-control
           ${Formik.errors.name ? 'error-box' : ""}
           ${Formik.touched.name && !Formik.errors.name ? 'success-box' : ""}`
                }
              />
              {
                Formik.errors.name ? <span style={{ color: "red" }}>{Formik.errors.name}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>Phone</label>
              <input
                name="phone"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.phone}
                type={"text"}
                class={`form-control 
          ${Formik.errors.phone ? 'error-box' : ""}
          ${Formik.touched.phone && !Formik.errors.phone ? 'success-box' : ""}`
                }
              />
              {
                Formik.errors.phone ? <span style={{ color: "red" }}>{Formik.errors.phone}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>Email</label>
              <input
                name="email"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                value={Formik.values.email}
                type={"text"}
                class={`form-control
                ${Formik.errors.email ? 'error-box' : ""}
                ${Formik.touched.email && !Formik.errors.email ? 'success-box' : ""}
              `}
              />
              {
                Formik.errors.email ? <span style={{ color: "red" }}>{Formik.errors.email}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>JoinYear</label>
              <select
                name="joinyear"
                onChange={Formik.handleChange}
                value={Formik.values.joinyear}
                class="form-control">
                <option></option>
                {
                  years.map(yr => {
                    return (
                      <option>{yr}</option>
                    )
                  })
                }
              </select>
              {
                Formik.errors.joinyear ? <span style={{ color: "red" }}>{Formik.errors.joinyear}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>Department</label>
              <select
                name="department"
                onChange={Formik.handleChange}
                value={Formik.values.department}
                class="form-control">
                <option></option>
                {
                  dept.map(dt => {
                    return (
                      <option>{dt}</option>
                    )
                  })
                }
              </select>
              {
                Formik.errors.department ? <span style={{ color: "red" }}>{Formik.errors.department}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="form-group">
              <label>Gender</label>
              <select
                name="gender"
                onChange={Formik.handleChange}
                value={Formik.values.gender}
                class="form-control">
                <option></option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {
                Formik.errors.gender ? <span style={{ color: "red" }}>{Formik.errors.gender}</span> : null
              }
            </div>
          </div>

          <div class="col-lg-12 mt-3 text-center">
            <input type="Submit" value="Submit" className='btn btn-outline-primary' style={{ fontSize: "16px", fontWeight: "bold", padding: "10px 20px", color: "white", border: "none", backgroundColor: " rgb(129, 80, 221)" }} />
          </div>

        </div>

      </form>
    </div>
  )
}

export default Adminaddstudent