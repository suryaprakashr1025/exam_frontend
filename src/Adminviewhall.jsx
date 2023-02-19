
import "./Adminviewhall.css"
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { Config } from './Config'
import { ThreeDots } from 'react-loader-spinner'
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { UserContext } from "./Usercontext"
import {Link} from "react-router-dom";

function Adminviewhall() {

  const halldetails = useContext(UserContext)

  const [values, setValues] = useState("")
  const [block, setBlock] = useState([])
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
      const getData = await axios.get(`${Config.api}/gethall`)
      setUser(getData.data)

      setPage(getData.data)
      setPage(getData.data.slice(0, 5))

      let blocks = getData.data
      let blockdata = blocks.map(blk => {
        return blk.block
      })


      let blockindex = blockdata.filter((blk, index) => {
        return blockdata.indexOf(blk) === index
      });
      console.log(blockindex)


      setBlock(blockindex)
      setLoading(false)

    } catch (error) {
      alert("something went wrong")
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(values)
  console.log(values.length === 1)

  const fetchData = async (index) => {
    try {
      const start = perPage * index;
      const end = start + perPage;
      const getData = await axios.get(`${Config.api}/gethall`)
      setPage(getData.data.slice(start, end))
      setCurrentpage(index)
    } catch (error) {
      alert("something went wrong")
    }
  }

  const findBlock = async () => {
    try {
      for (let i = 0; i < block.length; i++) {
        if (values === block[i]) {
          setLoading(true)
          const getData = await axios.get(`${Config.api}/gethall/${values}`)
          setUser(getData.data)
          setPage(getData.data)
          setPage(getData.data.slice(0, 5))
          setLoading(false)
        }
      }
    } catch (error) {
      alert("FindBlock is error")
    }
  }

  const confirm = (id) => {
    setPopup(true)
    setMessage("Why are you delete this user ?")
    setDeleteid(id)
  }


  const pagenumbers = Math.ceil(user.length / perPage)
  // console.log(pagenumbers)

  return (
    <>
      <div className='text-center mt-3'>
        <label className='text-center' style={{ fontSize: "30px" }}>Hall Details</label>

        <form className='mt-4' style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <div class="col-lg-4">
            <select class="form-control" value={values} onChange={(e) => setValues(e.target.value)} >

              {
                block.map(blk => {
                  return (
                    <option onClick={findBlock}>{blk}</option>
                  )
                })
              }
            </select>
          </div>
          <div class="col-auto mx-2">
            <button type="submit" class="btn btn-primary mb-3" onClick={getData} style={{ fontSize: "16px", fontWeight: "bold", padding: "7px 20px", color: "white", border: "none", backgroundColor: " rgb(129, 80, 221)" }}>All Data</button>
          </div>

        </form>

      </div>



      <div className={`tableitem mt-2 ${popup ? "userdisablepage" : null}`} >

        <table class="table ">
          <thead>
            <tr>
              <th scope="col">Block</th>
              <th scope="col">Hall</th>
              <th scope="col">Seat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {loading ? 
            <tr>
              <td colspan="4">
                <div style={{ height: "10vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}><ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                /> </div>
              </td>
            </tr> :
              page.map(userlist => {
                return (
                  <tr>
                    <td>{userlist.block}</td>
                    <td>{userlist.hall}</td>
                    <td>{userlist.number_of_seats}</td>

                    <td>
                      <Link to={`/admindashboard/adminhall/${userlist._id}`} style={{ cursor: "pointer" }}><FaRegEdit /></Link>
                      <a onClick={() => confirm(userlist._id)} style={{ cursor: "pointer" }}> <AiOutlineDelete /></a>
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
{halldetails.setRoom(user)}

    </>
  )
}

export default Adminviewhall