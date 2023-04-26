import axios from 'axios';
import './styles.css'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

var result;
var allUsers;
const Home = () => {

    
    let navigate=useNavigate();

    const [id,setId]=useState([]);
    const [userid,setUserId] = useState([]);

    const navi1=async(e)=>{
        setUserId(e.target.value)
        allUsers = await axios.get(`http://localhost:9191/user/getAllUser`);
        console.log(allUsers.data[0])
        console.log(allUsers.data.length)

        for(let i=0; i<allUsers.data.length; i++){
            alert(allUsers.data[i].name);
            if(allUsers.data[i].name == e.target.value){
                alert("found it!");
            }
        }


        // alert("in navi1")
        // setId(e.target.value)
        // alert(e.target.value)
        // result=await axios.get(`http://localhost:9191/user/getUser/`+e.target.value);
        // //alert(result.data.role)
        // console.log(result)
        // alert(result.data.role)
        // if(result.data.role==="Admin")
        //     navigate("/adminmain")
        // else
        //     navigate(`/usermain/${id}`)
        //alert(result.data.role);

        //navigate("/adminmain");
        // navigate(0);
    }

    const navi=async(e)=>{
        e.preventDefault();
        // alert("in navi")
        // setId(e.target.value)
        // alert(e.target.value)
        // alert(`${userid}`.toLowerCase())
        

        allUsers = await axios.get(`http://localhost:9191/user/getAllUser`);
        // alert("alluesers fetched")
        // alert(allUsers.data[3].userId)
        // alert(allUsers.data[0].name.toLowerCase())
        console.log(allUsers.data)
        let i;
        for(i=0; i<allUsers.data.length; i++){
            // alert(allUsers.data[i].name);
            if(allUsers.data[i].userId == userid){
                // alert("found it!");
                setId(allUsers.data[i].userId)
                // alert(allUsers.data[i].userId)
                break;
            }
        }
        // alert(`http://localhost:9191/user/getUser/`+allUsers.data[i].userId)
       result = await axios.get(`http://localhost:9191/user/getUser/`+allUsers.data[i].userId);
       console.log(result.data)
    //    alert(result.data.role)
        if(result.data.role === "Admin")
            navigate("/adminmain")
        else{
            // alert(`/usermain/`+allUsers.data[i].userId)
            navigate(`/usermain/`+allUsers.data[i].userId) 
        }

        // navigate(0); 
    }


  return (
    <div className='admincreate'>
        <div className='container'>
        <img src="https://www.integrify.com/site/assets/files/7082/best-workflow-management-software.png" 
        alt="WorkflowLogo"/>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <form>
            <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                   Enter your User ID: 
                </label>
                <input
                    type={"text"}
                    className="form-control"
                    placeholder='Enter user ID'
                    onChange={(e)=>setUserId(e.target.value)} 
                    required
                />
            </div>
            <button className='btn btn-outline-primary' onClick={(e)=>navi(e)}>Login</button>
        </form>
        </div>
        </div>

        <div className="footer">
                <p>Made with ❤️ and 🧑‍💻 by <i>Workflow data model team</i></p>
            </div>
    </div>
  )
}

export default Home