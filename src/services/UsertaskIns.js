import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

export default function Tasks() {
    let navigate = useNavigate()
    const [tasks,setTask]=useState([])
    const [taskins,setTaskIns]=useState([])
    const [actions,setAction]=useState([])
    const [act,setSelectedCategory]=useState("")
    const [comment,setComment]=useState([])
    const [taskId,setTaskId]=useState([])

    var bodyFormData = new FormData();
    const{id}=useParams();
    useEffect(()=>{
        loadUser();
    },[]);

    bodyFormData.append('taskInstanceId', taskins);
    bodyFormData.append('actionId', act);
    bodyFormData.append('comments', comment);
    console.log(taskId)
    // alert(act)
    // console.log("comment")
    // console.log(tasks)

    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/action/performAction/${id}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch(error => {
            alert(error);
            console.log(error)
            //navigate(`/`);
            
        });
        // navigate(`/usermain`);
        // navigate(0);
    };



    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/taskInstance/fetchTaskInstances/${id}`)
        setTask(result.data);
    


    }

    const callact=async()=>{
        const resultact =await axios.get(`http://localhost:9191/action/viewActions/${taskId}`)
        setAction(resultact.data);
    }


  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3'>
        <div className='py-4'>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Attachments</th>
                            <th scope="col">Status</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Comment</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => (
                                
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{task.workflowInstance.attachments}</td>
                                    <td>{task.status}</td>
                                    <td>{task.workflowInstance.description}</td>
                                    {/* {setTaskIns(task.taskInstanceId)} */}
                                    {/* <td>{task.workflowInstance.workflow.name}</td> */}
                                    <td>

                                    
                                        <div className='mb-3'>
                                            <label htmlFor='Name' className='form-label'>
                                                Enter your Comments
                                            </label>
                                            <input
                                                type={"text"}
                                                className="form-control"
                                                placeholder='comments'
                                                //value="wf_name"
                                                onChange={(e)=>{setComment(e.target.value);setTaskId(task.task.taskId);setTaskIns(task.taskInstanceId);callact()}}
                                                required
                                            />
                                        </div>
                                        </td>
                                        <td>

                                        Actions
                                        <form onSubmit={(e)=>onSubmit(e)}>
                                            <div className='mb-3'>
                                                
                                                <select
                                                    //value={selectedCategory}
                                                    onClick={(e) => setSelectedCategory(e.target.value)}
                                                    className="product-dropdown"
                                                    >
                                                        <option disabled selected value> -- Select an Option -- </option>
                                                    {actions.map((action) => (
                                                        <option value={action.actionId}>{action.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        
                                        <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                                        </form>

                                        {/* <Link className="btn btn-primary mx-2" to={`/usermain`}>
                                            Action
                                        </Link> */}
                                        
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>

            </div>

            <Link className='btn btn-primary my-2' to={`/usermain/${id}`}>Back to Home</Link>
        </div>
        </div>
        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
        </div>
  )
}
