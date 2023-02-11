
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { Config } from './Config'
import { Comment, Rings } from 'react-loader-spinner'
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

function Adminviewstudent() {
  const [user, setUser] = useState([])
  const [page, setPage] = useState([])
  const [currectPage, setCurrentpage] = useState()
  const [popup, setPopup] = useState(false)
  const [deleteid, setDeleteid] = useState("")
  const [message, setMessage] = useState("")
  const [reason, setReason] = useState("")
  const [verify, setVerify] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const perPage = 5

  const getData = async () => {
    try {
      setLoading(true)
      const getData = await axios.get(`${Config.api}/getstudent`)
      setUser(getData.data)
      // const start = perPage * 0;
      // const end = start + perPage;
      setPage(getData.data)
      setPage(getData.data.slice(0, 5))
      setLoading(false)
    } catch (error) {
      alert("something went wrong")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const fetchData = async (index) => {
    try {
      const start = perPage * index;
      const end = start + perPage;
      const getData = await axios.get(`${Config.api}/getstudent`)
      setPage(getData.data.slice(start, end))
      setCurrentpage(index)
    } catch (error) {
      alert("something went wrong")
    }
  }

  const deleteItem = async (id) => {
    try {
      setSent(true)
      const setreason = await axios.put(`${Config.api}/setreason/${id}`, {
        reason: `${reason}`
      })

      const deletelist = await axios.delete(`${Config.api}/deleteuser/${id}`)
      // resetForm()
      getData()
      setPopup(false)
      setSent(false)
    } catch (error) {
      alert("something went wrong")
    }
  }

  

  const confirm = (id) => {
    setPopup(true)
    setMessage("Why are you delete this user ?")
    setDeleteid(id)
  }

  const secondconfirm = () => {
    setVerify(true)
  }

  const cancel = () => {
    setPopup(false)
  }



  const pagenumbers = Math.ceil(user.length / perPage)
  console.log(pagenumbers)

  return (
    <>
      <div className='text-center mt-5'>
        <label className='text-center' style={{ fontSize: "30px" }}>Student Details</label>
      </div>

      <div className={`tableitem mt-5${popup ? "userdisablepage" : null}`}>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Gender</th>
              <th scope="col">Year</th>
              <th scope="col">StudentId</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {loading ? <div class="d-flex justify-content-center rings1" style={{ width: "100%" }}><Rings
              height="80"
              width="50"
              color="black"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            /> </div> :
              page.map(userlist => {
                return (
                  <tr>
                    <td>{userlist.name}</td>
                    <td>{userlist.phone}</td>
                    <td>{userlist.email}</td>
                    <td>{userlist.department}</td>
                    <td>{userlist.gender}</td>
                    <td>{userlist.year_of_study}</td>
                    <td>{userlist.student_id}</td>
                    <td>
                      <a onClick={() => confirm(userlist._id)} style={{cursor:"pointer"}}><FaRegEdit/></a>
                      <a onClick={() => confirm(userlist._id)} style={{cursor:"pointer"}}> <AiOutlineDelete/></a>
                      </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>

      {
        user.length > 5 ?

          <nav aria-label="Page navigation example" className={`navpage mx-auto ${popup ? "userdisablepage" : null}`} >
            <div className='paginationdiv'>
              <ul class="nav justify-content-center pageul my-3">
               
                {
                  user.length > 5 ?
                    [...Array(pagenumbers)].map((page, index) => {
                      return (
                        <li class="nav-item">
                          <a class={`nav-link pagelink ${currectPage === index ? "active" : null}`} onClick={() => fetchData(index)}>{index + 1}</a>
                        </li>
                      )
                    }) : null
                }
               
              </ul>
            </div>
          </nav> : null
      }


    </>
  )
}

export default Adminviewstudent