import React, { useState,useEffect } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useCallback } from "react";


let b_col;
let b_col1;
let workflows;
export default function AdminMain() {

    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }
      
    let navigate = useNavigate()
    
    const [wf, setWf] = useState("")
    const [allwf,setAllwf] = useState([])
    const [selectValue, setSelectValue] = useState("");
    // const [selectedId, setSelectedId] = useState("");
    

    const onChange = (event) => {
        const value = event.target.value;
        // const key = event.target.key;
        setSelectValue(value);
        setWf(value)
        console.log(value)
        // setSelectedId(key)
      };

    const refreshPage = () => {
        navigate(0);
      }
    useEffect(()=>{
        
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/workflow/viewAllWorkflow`)
        workflows = result.data
        setAllwf(result.data)
        console.log(workflows)
        b_col = workflows.map(x => x.workflowId);
        console.log(b_col)

    }
    const handle = useCallback(() => {
        b_col1 = b_col.map(String)
        if (b_col1.includes(wf)){
            // alert(wf);
            navigate(`/viewtask/${wf}`)
        }
        else{
            alert('Please enter correct workflow ID!! ');
        }
      }, [wf]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <Link className='btn btn-primary my-2' to={"/admincr"}>Add New Worklfow</Link>
                    <form>
                    <div className='mb-3'>
                            {/* <label htmlFor='Name' className='form-label'>
                               Enter WorkFlow ID for Updating
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Worklfow ID'
                                name="wf_name"
                                //value="wf_name"
                                onChange={(e) => setWf(e.target.value)}
                                required
                            /> */}
                        </div>
                        {/* <Link className='btn btn-primary my-2' to={`/viewtask/${wf}`}>Update</Link>

                        <Link className='btn btn-primary my-2' onClick={() => alert('hello')
                    }>Update</Link> */}
                        

                        <br></br><h3 htmlFor='Name' className='form-label'>
                               Available Workflows:
                            </h3>
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
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
                <label htmlFor='Name' className='form-label'>
                               Select a workflow to instantiate from dropdown:
                            </label>

                            
                            <select onChange={onChange}  class="custom-select custom-select-lg mb-3"  >
                            <option disabled selected value> -- Select an Option -- </option>
                            {
                            allwf?.map((obj) => {
                                return <option value={obj.workflowId}>{obj.name}</option>
                                })
                            }
                            </select>
                            {/* {selectValue && <h2 className="mt-3">{selectValue}</h2>} */}

                            <button className='btn btn-primary my-2' onClick={handle}>  Update  </button>

                            <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
        </div>
    );
}
