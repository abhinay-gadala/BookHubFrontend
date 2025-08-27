import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginView = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken, userId) => {
    Cookies.set("jwt_token", jwtToken, { expires: 7 });
    localStorage.setItem("UserId", userId); // Store userId for later use
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };
  

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    try {
      const response = await fetch("http://localhost:3005/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      
      if (response.ok) {
        onSubmitSuccess(data.jwt_token, data.userId); // Pass userId here
      } else {
        onSubmitFailure(data.error_msg || "Login failed");
      }
    } catch (error) {
      onSubmitFailure("Network error: " + error.message);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const { toggleView } = props;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="flex flex-col justify-center mb-6 ">
        <img
          src="https://placehold.co/120x40/ffffff/000000?text=BookHub"
          alt="BookHub Logo"
          className="h-10"
        />
       
      </div>
       <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Login Your Account
      </h2>
      <form
        className="bg-white p-8 rounded w-full max-w-md"
        onSubmit={submitForm}
      >
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {showSubmitError && (
          <p className="text-red-500 mt-4 text-center">{errorMsg || "Invalid email or password"}</p>
        )}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={toggleView}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginView;