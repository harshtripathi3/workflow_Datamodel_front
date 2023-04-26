import React, { useState,useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useCallback } from "react";

export default function TaskIns() {

    let navigate = useNavigate()

    const {id}=useParams();
    const [taskins,setTaskIns] = useState([])
    

    const refreshPage = () => {
        navigate(0);
      }
      
    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/taskInstance/taskInstances/${id}`)
        setTaskIns(result.data)
        console.log(taskins)

    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <br></br><h3 htmlFor='Name' className='form-label'>
                                Task Instance:
                            </h3>
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Task Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            taskins.map((flows, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    {/* <td>{flows.description}</td> */}
                                    <td>{flows.status}</td>
                                    <td>{flows.task.description}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>

                </div>
            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
        </div>
    );
}
