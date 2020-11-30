import React from "react";
import { Link,Redirect } from "react-router-dom";
import "./navbar.css";
import Typical from "react-typical";
import { logout } from "../../auth/auth";

const NavBar = ()=>{


    
    const currentUser = ((JSON.parse(localStorage.getItem("jwt"))) !== null) ? (JSON.parse(localStorage.getItem("jwt"))).user.username : null;
    return(
      
   <nav className="navbar navbar-default navbar-static-top" role="navigation" >
  
    <div className="container">

    <div className="navbar-header px-1" style={{width: 100,}}>
    <a className="navbar-brand navbar-dark text-black-50" href="/">We're {""}
      <Typical
        loop ={Infinity}
        wrapper = 'b'
        steps = {
          [
            'Developers!!',
            1000,
            'Inovators!!',
            1000,
            'the Future!!',
            1000

          ]
        }
        />
    </a> 
    </div >
    <div className="navbar-brand navbar-dark nav-justified text-black-50"> Developer Hub</div>

  <ul className="nav navbar-nav navbar-right">{

      (currentUser) ? (
         <div> 
        <li>
      Hello, {currentUser}  
      </li>
      <li>
      <Link 
          className = " text-black-50"
          onClick ={() => {
            logout(() => {
              return <Redirect to = "/"/>
              });
          }}
          
        >
          Log out
        </Link>
      </li>
      </div>
      ):(
      <div>
      <li >
      <Link 
          className = " text-black-50"
          to="/login"
        >
          Log in
        </Link>
      </li>
      <li>
      <Link 
          className = " text-black-50"
          to="/signup"
        >
          Signup
        </Link>
      </li>
      </div>
      )
   }
  
  </ul>

</div>
</nav>

 );
}
export default NavBar ;