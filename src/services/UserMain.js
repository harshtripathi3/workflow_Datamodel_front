import React, { useState,useEffect } from 'react'
import { Link, useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function UserMain() {
    let navigate = useNavigate()
    const [wf, setWf] = useState("");
    const [desc,setDesc] =useState("");
    const [att,setAtt] =useState("");
    const [allwf,setAllwf] = useState([])
    const{id}=useParams();
    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:9191/workflow/workflowToInitialise/${id}`)
        setAllwf(result.data)
    }
    // const att="link";
    var bodyFormData = new FormData();
    bodyFormData.append('description', desc);
    bodyFormData.append('attachments',att);

    console.log(desc);
    console.log(att);

    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/workflowInstance/addWorkflowInstance/${id}/${wf}`,
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
            //alert("wf"+{wf})
        navigate(`/usermain/${id}`);
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <div><Link className='btn btn-primary my-2' to={`/userins/${id}`}>Current Task</Link>
                    {"             "}<Link className='btn btn-primary my-2' to={`/prevtask/${id}`}>Previous WorkFlow Instance</Link></div>
                    
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th scope="col">Available Workflow to Instantiate</th>
                        </tr>
                    </thead>
                    <td>
                    
                    <select onChange={(e) => setWf(e.target.value)}  class="custom-select custom-select-lg mb-3"  >
                            <option disabled selected value> -- Select an Option -- </option>
                            {
                            allwf?.map((obj) => {
                                return <option value={obj.workflowId}>{obj.name}</option>
                                })
                            }
                            </select>

                    

                    </td>
                </Table>
                    <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                               Enter WorkFlow Description
                            </label>
                                <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Worklfow Desc.'
                                //name="wf_desc"
                                //value="wf_name"
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder='Enter Attachment link: (Optional)'
                                //name="wf_desc"
                                //value="wf_name"
                                onChange={(e) => setAtt(e.target.value)}
                                //required
                            />
                        </div>
                        <button type='submit'  className='btn btn-outline-primary'>Submit</button>
                        {/* <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link> */}
                    </form >
 
                </div>
            </div>
            <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
        </div>
    );
}
