import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlice";

const HandleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract token from URL
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(setToken(token));
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center"></div>
  );
};

export default HandleAuth;
