import React, { useState } from 'react'
import "./Adminaddhall.css"
import axios from 'axios'
import { Form, useFormik } from 'formik'
import { Config } from './Config'

function Adminaddhall() {
    const [block, setBlock] = useState()
    const [hall, setHall] = useState()
    const [seat, setSeat] = useState()
    let alpha = []
    for (let i = 65; i <= 90; i++) {
        alpha.push(String.fromCharCode(i))
    }
    console.log(alpha)
    console.log(block)
    console.log(hall)
    console.log(seat)
    const Formik = useFormik({
        initialValues: {
            block: "",
            hall: "",
            seat: ""
        },
        validate: (values) => {
            const errors = {}
            if (!values.block) {
                errors.block = "Please select the block"
            }

            if (!values.hall) {
                errors.hall = "Please enter hall no"
            }

            if (!values.seat) {
                errors.seat = "Please enter seats"
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                var users = await axios.post(`${Config.api}/createhall`, values)
            }
            catch (error) {
                alert("error")
            }
        }
    }
    )
    return (
        <div className='container mt-5' style={{ border: "1px solid black",padding:"30px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"orange"}}>
            <div className='col-lg-12 mb-3 text-center' style={{fontSize:"30px"}}>
                <label className=''>Add Hall</label>
            </div>

            <form className="form-group" onSubmit={Formik.handleSubmit}>

                <div className='row '>

                    <div className='col-lg-4 mb-3'>
                        <div class="form-group">
                            <label className='text-center'>Block</label>
                            <select class="form-select"
                                name="block"
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                values={Formik.values.block}
                            >
                                {/* <option selected>Select The Block</option> */}
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

                    <div className='col-lg-4 mb-3'>

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

                    <div className='col-lg-4 mb-3'>

                        <div class="form-group">
                            <label>Seat</label>
                            <input
                                name="seat"
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                value={Formik.values.seat}
                                type={"text"}
                                class={`form-control 
                                        ${Formik.errors.seat ? 'error-box' : ""}
                                        ${Formik.touched.seat && !Formik.errors.seat ? 'success-box' : ""}`
                                }
                            />
                            {
                                Formik.errors.seat ? <span style={{ color: "red" }}>{Formik.errors.seat}</span> : null
                            }

                        </div>


                    </div>

                    <div class="col-lg-12 text-center">
                        <input type="Submit" value = "Submit" className='btn btn-outline-primary' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Adminaddhall