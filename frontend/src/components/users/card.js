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
        <FaGithub />@{userdetails.username}<br/>
        
          <FaMapMarkerAlt /> {userdetails.city}<br/><br/>
          <div className="grid mx-5 px-3">
            <FaDove/>
            <GoOrganization/>
            <GoStar/>
          </div><br/><br/>
          <p><b>Joined Developer Hub: </b> {userdetails.createdAt}</p>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default UserCard;