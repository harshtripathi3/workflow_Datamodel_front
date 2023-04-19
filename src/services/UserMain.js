import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function UserMain() {
    let navigate = useNavigate()
    const [wf, setWf] = useState("");
    const [desc,setDesc] =useState("");
    const [allwf,setAllwf] = useState([])

    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/workflow/workflowToInitialise/2`)
        setAllwf(result.data)
    }

    var bodyFormData = new FormData();
    bodyFormData.append('description', desc);
    console.log(desc);

    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/workflowInstance/addWorkflowInstance/1/${wf}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log("check1");
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        navigate("/usermain");
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <Link className='btn btn-primary my-2' to={"/userins"}>See your Task</Link>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                               Enter WorkFlow ID for Instantiate
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Worklfow ID'
                                //name="wf_name"
                                //value="wf_name"
                                onChange={(e) => setWf(e.target.value)}
                                required
                            />
                                <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Worklfow Desc.'
                                //name="wf_desc"
                                //value="wf_name"
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form >
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allwf.map((flows, index) => (
                                <tr>
                                    {/* <th scope="row" key={index}>{index + 1}</th> */}
                                    <td>{flows.workflowId}</td>
                                    <td>{flows.name}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>
                </div>
            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Harsh Tripathi</i></p>
            </div>
        </div>
    );
}
