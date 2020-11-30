import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {authenticate, isAuthenticated} from '../../auth/auth';
import FormLayout from "./formlayout";

const Login = () =>{
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        
    
      });
    
    const { email, password,confirmpassword } = values;
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values});
      
        fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email : email,
            password: password
          })
        })
        .then(response => {
             return response.json();
            })
        .then(profile =>     
           {
             if(profile.error){
               //TO DO: Display Alert
                 alert(profile.error);
                 console.log(profile.error);
             }
             else{
                 authenticate(profile, ()=>{
                  setValues({...values});
   
                 });
                 
                 
                }
                }  
            )
        .catch(err => console.log(err));
      };// end of clickEvent after form submission

    const redirect = ()=>{
        if(isAuthenticated()){
          return <Redirect to="/" />;

        }
      }


     
    const loginform = ()=>{
        return(
            <div className="d-flex justify-content-center">
            <Form  className = "my-2">
            <FormGroup className = "mx-2 my-5 px-5 py-2" style ={{width: 500,}}>
            <Input  className = "my-2" type="email"  value= {email}  required ={true}  name="email" id="email" placeholder="Email" onChange={handleChange("email")}/>
            <Input className = "my-2"  type="password" value ={password} required = {true}  name="password" id="password" placeholder="password" onChange={handleChange("password")} />
            <Input className = "my-2"  type="password" required   name="confirmpassword" id="confirmpassword" placeholder="confirm password" onChange={handleChange("confirmpassword")}/>
            <br/>
            <Button className="btn btn-primary btn-block"   onClick ={onSubmit}>
                 Login
            </Button>
            <p className="lead mt-4">Don't Have An Account? <a href="/signup">Signup Here!</a></p>
            </FormGroup>    
            </Form>
            </div>

        );
    }



return(
    <FormLayout description="Login Here!">
    {loginform()}
    {redirect()}
    </FormLayout>

);
}


export default Login;