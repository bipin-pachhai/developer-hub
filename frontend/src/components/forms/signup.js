import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label,Input,InputGroup, InputGroupAddon, FormText } from 'reactstrap';
import FormLayout from "./formlayout";
import {authenticate, isAuthenticated} from '../../auth/auth';

 const Signup = () => {

  const [values, setValues] = useState({
    title: "Mr.",
    firstname: "",
    lastname: "",
    city: "",
    company: "",
    bio: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    agreed: false
    
  });

  const { title,firstname,lastname,city,company,bio,
     username ,email, password,confirmpassword } = values;


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = event => { 
    event.preventDefault();
    setValues({ ...values, error: false });
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email : email,
        password: password,
        confirmpassword: confirmpassword,
        title: title,
        firstname: firstname,
        lastname: lastname,
        city: city,
        company: company,
        bio: bio,
      })
    })  
      .then(response =>  response.json())
      .then(profile => {
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
      })
      .catch(err => console.log(err));

    
  };// end of onSubmit event control function

  const redirect = ()=>{
    if(isAuthenticated()){
      return <Redirect to="/" />;

    }
  }
   
    const signUpForm = () => {
        return (
          <div className="d-flex justify-content-center">
          <Form className =" mt-5 px-5" >
         
           <FormGroup>
            <InputGroup>
            <InputGroupAddon addonType="append" >
            <select  className =" mr-2" onChange = {handleChange("title")}>
    
             <option value = "Mr.">Mr.</option>
             <option value = "Mrs.">Mrs.</option>

          </select>
            <Input className =" mr-2" type="firstname" required name="firstname" id="firstname" placeholder="FirstName" onChange={handleChange("firstname")} />
            <Input className =" mr-2" type="lastname" required name="lastname" id="lastname" placeholder="LastName" onChange={handleChange("lastname")}/>
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
            <InputGroupAddon addonType="append">
            <Input className =" mr-2" required name="city" id="city" placeholder="Your City" onChange={handleChange("city")} />
            <Input className =" mr-2"  name="company" id="company" placeholder="Company You Work" onChange={handleChange("company")}/>
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">Bio:</Label>
            <Input type="textarea" name="bio" id="bio" placeholder = "Tell us about yourself!!" style = {{width: 600,}} onChange={handleChange("bio")} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Upload Profile Picture</Label>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">  
            </FormText>
          </FormGroup>

            <FormGroup>
            <InputGroup>
            <InputGroupAddon  addonType="append" >
            <Input  className = "mr-2" type="username" required name="username" id="username" placeholder="username" style = {{width: 300,}} onChange={handleChange("username")}/>
            <Input  className = "mr-2" required type="email" name="email" id="email" placeholder="Email" onChange={handleChange("email")} />
            </InputGroupAddon>
            </InputGroup>
            </FormGroup>

            <FormGroup>
            <InputGroup>
            <InputGroupAddon addonType = "append">
            
            <Input className = "mr-2" type="password" required name="password" id="examplePassword" placeholder="password" onChange={handleChange("password")}/>
         
            <Input className = "mr-2" type="password" required name="password" id="examplePassword" placeholder="confirm password" onChange={handleChange("confirmpassword")}/>
            </InputGroupAddon>
            </InputGroup> 
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" required onChange ={handleChange("agreed")}/>{''}
              I agree to all the terms and conditions applied.
            </Label>  
            <br/>
            <Button className="btn btn-primary btn-block" onClick={onSubmit}>
          Sign Up
        </Button>
        <p className="lead mt-4">Have An Account? <a href="/login">Login Here!</a></p>
        </FormGroup>
          
      </Form>
      </div>

        );
      };


  return (
    <FormLayout  description="Please SignUp Here!">
    {signUpForm()}
    {redirect()}
    </FormLayout>
  );
};

export default Signup;