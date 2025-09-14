import { useState } from "react";

import LoginView from "./loginview";
import SignUpView from "./SigupPage";
import Footer from "./Footer";


const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  // Function to toggle between login and sign-up views
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <>
     <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg w-full max-w-4xl">
        {/* Left-side image column (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center p-8">
          <img
            src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756201562/Rectangle_1467_ry7la4.png"
            alt="An open book on a table"
            className="rounded-lg shadow-md w-full"
          />
        </div>
        
        {/* Right-side form column */}
        <div className="p-8">
          {/* Conditionally render the correct form based on state */}
          {isLoginView ? (
            <LoginView toggleView={toggleView} />
          ) : (
            <SignUpView toggleView={toggleView} />
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  
  );
};

export default LoginPage;