import React from "react";
const FormLayout = ({
  title = "Developer Hub",
  description = "Welcome",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div className = "pt-1">
    <div className="container-fluid container" >
      <div className="bg-dark text-white text-center" style= {{height: 50,}}>
        <h2 className="pt-2 display-7" ><a href = "/">{title}</a></h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3" style = {{
      position: "auto",
      bottom: 0,
      right:0,
      left:0,

    }}>
      <div className="container-fluid text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
        © DEVELOPER HUB
        </span> 
      </div>
    </footer>
    </div>
);
export default FormLayout;