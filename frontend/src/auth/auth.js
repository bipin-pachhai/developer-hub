export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };
  
  export const logout = next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
  
      return fetch("http://localhost:4000/logout", {
        method: "GET"
      })
        .then(response => {return response.json();
        })
        .then(message => console.log(message))
        .catch(err => console.log(err));
    }
  };
  
  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };