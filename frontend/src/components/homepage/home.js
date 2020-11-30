import React, { useState, useEffect } from "react";
import UserCard from "../users/card";
import {  Container,Col, Row } from "reactstrap";
import "./home.css"

const Home = ()=>{

    const [users, setUsers] = useState([]);
    const fetchUsers =  ()=>{
         fetch("http://localhost:4000/", {
             method: "GET",
             headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
          })
          .then(response =>{ return response.json();})
          .then(users =>setUsers(users))
          .catch(err => console.log(err))

    } 
    

    useEffect(() => {
        fetchUsers();
      }, []);

    return(
        <Container>
            <Row>
            <Col md={15} className="">
         
            <div className="grid">{
            users.map((user, index) => {
              return( <UserCard userdetails = {user} />)
            }
            )
              }
            </div>
             </Col>
            </Row>
        </Container>

    );
}

export default Home;
