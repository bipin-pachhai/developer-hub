import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { FaDove,FaGithub, FaMapMarkerAlt, } from "react-icons/fa";
import { GoOrganization,GoStar } from "react-icons/go"
import "./card.css"

const UserCard = ({ userdetails }) => {
  return (
    <Card>
      <CardBody className="text-center">
        <img
          height="100"
          width="100"
          className="rounded-circle img-thumbnail"
          src="https://picsum.photos/200"
        />
        <CardTitle className="text-primary">
          <h2>
            <span className="pr-2">{userdetails.title}</span>
            <span className ="pr-2">{userdetails.firstname}</span>
            <span className ="pr-2">{userdetails.lastname}</span>
          </h2>
        </CardTitle>
        <CardText >
        <p>{userdetails.bio}!</p>
        <p><b>Works at: </b> {userdetails.company}</p>
        <FaMapMarkerAlt /> {userdetails.city}<br/><br/>
        <FaGithub />@{userdetails.username}<br/>
        
        <table className="d-table-row-py-0"> 
			  <tr> 
        <td><GoOrganization/></td>
        <td><GoStar/></td>  
        <td><FaDove/></td>
		  	</tr> 
		  	<tr> 
        <td>{Math.floor(Math.random() * Math.floor(1000))}<b> Followers</b> </td>
        <td>{Math.floor(Math.random() * Math.floor(10000))}<b> Stars</b> </td>  
        <td>{Math.floor(Math.random() * Math.floor(95))} <b>Tweets</b> </td> 
			</tr> 
	  	</table><br/>
      <p><b>Member Since: </b> {(userdetails.createdAt).slice(0, 10)}</p>
          
    
          
          <br/>
          
        </CardText>
      </CardBody>
    </Card>
  );
};

export default UserCard;