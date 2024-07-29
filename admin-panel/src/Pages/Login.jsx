import React from "react";
import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

const Login = () => {
  // const history = useHistory();

  // const handleGoogleLoginSuccess = async (response) => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/auth/google", {
  //       token: response.tokenId,
  //     });
  //     localStorage.setItem("token", res.data.access_token);
  //     // history.push("/dashboard");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  // const handleGoogleLoginFailure = (response) => {
  //   console.error("Login failed:", response);
  // };
  console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <div>
      <h1>Admin Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
};

export default Login;
