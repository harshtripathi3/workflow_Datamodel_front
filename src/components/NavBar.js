import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
/*
  This component is used for rendering the Nav Bar which contains the following,
  - Welcome message for the logged in user
  - Logout Button
  - In more complex webpages you can include routes here with the help of React-Router
*/
const NavBar = () => {

      const [theme,setTheme]=useState(false);

    const handleClick=()=>{
        setTheme(!theme)
    }
    useEffect(()=>{
        if(theme==true){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark");
        }
    })
  // If the Logout button has been clicked then clear the loggedInUser object from localStorage and
  // update "user" state to null, in order to logout, otherwise on the next reload, the Effect hook will again read the user
  // from the localStorage and relogin without showing the login form

  // Fully styled Navbar using Bootstrap (it can be a big pain to style Navbars)
  return (
    <div className='regular-shadow mb-1'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-info' id='menu'>
        {/* UPDATE user.name PROPERTY IF IT DOESN'T EXIST */}
        <h3>IIIT Bangalore Workflow Data Model</h3>
        
        {/* Bootstrap element for hamburger menu on collapse */}
        <button
          className='navbar-toggler' type='button'
          data-toggle='collapse' data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        
        {/* This menu will be collapsed under Hamburger Menu if screen size becomes small enough */}
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {/* Here you can put a Link of React-Router, not of use right now but helpful for the future */}
            </li>
          </ul>

          <button className="btn btn-primary mx-2" onClick={handleClick}>{theme?"Light":"Dark"}</button>
          
          <div className='inline my-2 my-lg-0'><Link className="btn btn-primary mx-2" to={`/`}>Logout
                                        </Link></div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar