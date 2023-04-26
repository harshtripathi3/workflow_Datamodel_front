import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Admincreate = () => {

    let navigate=useNavigate();

    const [wf,setWf]=useState("");

    var bodyFormData = new FormData();
    bodyFormData.append('name', wf);
    const onSubmit=async(e)=>{
        axios({
            method: "post",
            url: `http://localhost:9191/workflow/addWorkflow`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        navigate("/adminmain");
        navigate(0);
    }


  return (
    <div className='admincreate'>
        <div className='container'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <form onSubmit={(e)=>onSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                    Worklfow Name
                </label>
                <input
                    type={"text"}
                    className="form-control"
                    placeholder='Enter Worklfow Name'
                    name="wf_name"
                    //value="wf_name"
                    onChange={(e)=>setWf(e.target.value)}
                    required
                />
            </div>
            <button type='submit'  className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to="/adminmain">Cancel</Link>
        </form>
        </div>
        </div>
        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
    </div>
  )
}

export default Admincreate