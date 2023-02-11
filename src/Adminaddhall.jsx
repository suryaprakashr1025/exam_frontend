import React, { useState } from 'react'
import "./Adminaddhall.css"
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { Config } from './Config'

function Adminaddhall() {
  
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
                var users = await axios.post(`${Config.api}/createhall`, values)
                Formik.resetForm()
            }
            catch (error) {
                alert("error")
            }
        }
    }
    )
    return (
        <div className='container mt-5 p-4' style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <div className='col-lg-12 mb-5 text-center' >
                <label style={{ fontSize: "22px", color: " rgb(129, 80, 221)" }}>Add Hall</label>
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
                        <input type="Submit" value="Submit" className='btn btn-outline-primary' style={{ fontSize: "16px",fontWeight:"bold",padding:"10px 20px", color:"white",border:"none", backgroundColor: " rgb(129, 80, 221)" }}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Adminaddhall