import React, { useEffect, useState } from 'react'
import "./Adminchart.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Config } from './Config'
import { Chart as chartjs, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"

chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)
function Adminchart() {
    const [hall, sethall] = useState()
    const [block, setBlock] = useState()
    const [staff, setStaff] = useState()
    const [student, setStudent] = useState()


    let dept = ["B.sc Computer Science", "B.sc Information Technology", "B.A English", "B.A Tamil", "Bachelor of Commerce", "BACHELOR OF COMMERCE COMPUTER APPLICATIONS", "B.sc Zoology", "B.sc Botony", "B.sc Chemistry", "B.sc Maths", "B.sc Physics"]

    const detail = [
        {
            "id": 1,
            "name": "Block",
            "total": `${block}`
        },
        {
            "id": 2,
            "name": "Hall",
            "total": `${hall}`,
        },
        {
            "id": 3,
            "name": "Department",
            "total": `${dept.length}`
        },
        {
            "id": 4,
            "name": "Staff",
            "total": `${staff}`
        },
        {
            "id": 5,
            "name": "Student",
            "total": `${student}`
        }

    ]

    const get = async () => {
        try {
            const get_block_hall = await axios.get(`${Config.api}/gethall`)
            sethall(get_block_hall.data.length)

            //console.log(get_block_hall.data.length)

            let block = get_block_hall.data
            let blockdata = block.map(blk => {
                return blk.block
            })
            //console.log(blockdata)

            let blockindex = blockdata.filter((blk, index) => {
                return blockdata.indexOf(blk) === index
            });
            //console.log(blockindex)
            //console.log(blockindex.length)

            setBlock(blockindex.length)

            const get_Department_student = await axios.get(`${Config.api}/getstudent`)
            setStudent(get_Department_student.data.length)
            // //console.log(get_Department_student.data.length)

            // let data = get_Department_student.data
            // let deptdata = data.map(dept => {
            //     return dept.department
            // })
            // //console.log(deptdata)

            // let index = deptdata.filter((dept, index) => {
            //     return deptdata.indexOf(dept) === index
            // });
            // //console.log(index)
            // //console.log(index.length)

            // setDepartment(index.length)

            const get_staff = await axios.get(`${Config.api}/getstaff`)
            setStaff(get_staff.data.length)

            //console.log(get_staff.data.length)

        } catch (error) {
            alert("Get the college details error")
        }
    }

    useEffect(() => {
        get()
    }, [])

    const college = {
        labels: ["Block", "Hall", "Department", "Staff", "Student"],
        datasets: [{
            label: "College",
            data: [`${block}`, `${hall}`, `${dept.length}`, `${staff}`, `${student}`],
            backgroundColor: ["#3687f1", "rgb(247, 112, 229)", "rgb(122, 182, 25)", "#FDB10B", "rgb(85, 162, 240)"],
            tension: 0.4,
            fill: 1,
            borderColor: "#FDB10B",
            borderWidth: 1.5
        }

        ]
    }

    const options = {
        maintainAspectRatio: false
    }


    return (
        <>

            {/* Home */}
            <section id="home">
                {
                    detail.map((detaills, index) => {
                        return (
                            <div class={`card ${detaills.name}`} style={{ width: "18rem" }}>
                                <div class="card-body text-center">
                                    <h5 class="card-title" >{detaills.name}</h5>
                                    <hr />
                                    <h6 class="card-title">No.of {detaills.name}</h6>
                                    <label>{detaills.total}</label>
                                </div>
                            </div>
                        )
                    })
                }

            </section>

            {/* Chart */}
            <section id="chart">
                <div className='text-center chart mx-auto my-12'>
                    <Line
                        data={college}
                        options={options}
                    ></Line>
                </div>
            </section>
        </>
    )
}

export default Adminchart