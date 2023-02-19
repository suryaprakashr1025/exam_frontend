import React, { useEffect, useState, useContext} from 'react'
import "./Adminaddhall.css"
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { Config } from './Config'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from './Usercontext'

function Adminaddhall() {
    const halldetails = useContext(UserContext)
    const halls = halldetails.room
    const { hallid } = useParams()
    
    const navigate = useNavigate()


    let alpha = []
    for (let i = 65; i <= 90; i++) {
        alpha.push(String.fromCharCode(i))
    }
    //console.log(alpha)

    const Formik = useFormik({
        initialValues: {
            block: "",
            hall: "",
            number_of_seats: ""
        },
        validate: (values) => {
            const errors = {}

            if (!values.block) {
                errors.block = "Please select the block"
            } else if (values.block === "") {
                errors.block = "Please select the block"
            }

            if (!values.hall) {
                errors.hall = "Please enter hall no"
            }

            if (!values.number_of_seats) {
                errors.number_of_seats = "Please enter seats"
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                var users = hallid.length > 5 ? await axios.put(`${Config.api}/updatehall/${hallid}`, values) : await axios.post(`${Config.api}/createhall`, values)
                Formik.resetForm()
                navigate("/admindashboard/adminviewhall")
            }
            catch (error) {
                alert("error")
            }
        }
    }
    )

    useEffect(()=>{
        if(hallid.length>5){
            const checkhall = halls.findIndex(ha=>{
                return ha._id === hallid
            })
            console.log(checkhall)
            console.log(halls[checkhall].block)
           
            Formik.setFieldValue("hall",halldetails.room[checkhall].hall)
            Formik.setFieldValue("number_of_seats",halldetails.room[checkhall].number_of_seats)
            Formik.setFieldValue("block",halldetails.room[checkhall].block)
        }
    },[])

const back = () =>{
    hallid.length > 5 ? navigate("/admindashboard/adminviewhall") : navigate("/admindashboard/adminchart")
}

    return (
        <div className='container mt-5 p-4' style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <div className='col-lg-12 mb-5 text-center' >
                <label style={{ fontSize: "22px", color: " rgb(129, 80, 221)" }}>{hallid.length > 5 ? "Update Hall": "Add Hall"}</label>
            </div>

            <form className="form-group" onSubmit={Formik.handleSubmit}>

                <div className='row '>

                    <div className='col-lg-4 mb-4'>
                        <div class="form-group">
                            <label className='text-center'>Block</label>
                            <select class="form-select"
                                name="block"
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                values={Formik.values.block}
                            >
                                <option></option>
                                {
                                    alpha.map((alphabet, index) => {
                                        return (
                                            <option value={alphabet} >{alphabet}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                Formik.errors.block ? <span style={{ color: "red" }}>{Formik.errors.block}</span> : null
                            }
                        </div>
                    </div>

                    <div className='col-lg-4 mb-4'>

                        <div class="form-group">
                            <label>Hall</label>
                            <input
                                name="hall"
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                value={Formik.values.hall}
                                type={"text"}
                                class={`form-control 
                                        ${Formik.errors.hall ? 'error-box' : ""}
                                        ${Formik.touched.hall && !Formik.errors.hall ? 'success-box' : ""}`
                                }
                            />
                            {
                                Formik.errors.hall ? <span style={{ color: "red" }}>{Formik.errors.hall}</span> : null
                            }

                        </div>


                    </div>

                    <div className='col-lg-4 mb-4'>

                        <div class="form-group">
                            <label>Seat</label>
                            <input
                                name="number_of_seats"
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                value={Formik.values.number_of_seats}
                                type={"text"}
                                class={`form-control 
                                        ${Formik.errors.number_of_seats ? 'error-box' : ""}
                                        ${Formik.touched.number_of_seats && !Formik.errors.number_of_seats ? 'success-box' : ""}`
                                }
                            />
                            {
                                Formik.errors.number_of_seats ? <span style={{ color: "red" }}>{Formik.errors.number_of_seats}</span> : null
                            }

                        </div>


                    </div>

                    <div class="col-lg-12 mt-3 text-center">
                    <input type="Submit" value="Back" onClick={back} className='btn btn-outline-primary mx-3' style={{ fontSize: "16px", fontWeight: "bold", padding: "10px 20px", color: "white", border: "none", backgroundColor: " rgb(129, 80, 221)" }} />
                        <input type="Submit" value={hallid.length > 5 ? "Update": "Add"} className='btn btn-outline-primary' style={{ fontSize: "16px", fontWeight: "bold", padding: "10px 20px", color: "white", border: "none", backgroundColor: " rgb(129, 80, 221)" }} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Adminaddhall