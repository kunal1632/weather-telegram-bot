import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const googleLogin = () => {
    window.location.href =
      "http://ec2-65-0-85-127.ap-south-1.compute.amazonaws.com:4000/auth/google";
  };

  return (
    <div className="w-full flex items-center mt-[10%] flex-col gap-5">
      <h1 className="text-white text-5xl font-semibold">Admin Login</h1>
      <p className="text-slate-200 text-xl">
        Login with your Google account to access admin controls for the Telegram
        bot.
      </p>
      <button
        onClick={googleLogin}
        className="text-white flex gap-2 items-center mt-5 text-xl border-[1px] border-slate-500 px-7 py-3 rounded-xl hover:scale-95 hover:bg-slate-950 bg-slate-900 transition-all duration-200"
      >
        Login with Google <FcGoogle size={25} />
      </button>
    </div>
  );
};

export default Login;
