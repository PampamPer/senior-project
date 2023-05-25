import { Navigate } from "react-router-dom";
import React from "react";

async function checkIfLogged() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  // const { setIsLogged } = useContext(AppContext);
  if (token) {
    const isExpired = isTokenExpired(token);

    if (role != null && !isExpired) {
      const login = await axios.get(`/personalinfo/${role}`, {
        headers: {
          Authorization: "Bearer " + token,
          // timeout: 5 * 1000,
        },
      });
      // setIsLogged();
      return login?.status == "200";
    }
  } else {
    return false;
  }
}

function isTokenExpired(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decodedToken.exp * 1000; // convert expiration time to milliseconds
  const currentTime = Date.now();
  return currentTime > expirationTime;
}

export default function Auth(props) {
  
    const isLogin = checkIfLogged();
    if (!isLogin) {
      return <Navigate to={"/"} replace={true}></Navigate>
    }
  

  return props.children;
}
