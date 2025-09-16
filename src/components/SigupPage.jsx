import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router";

const SignUpView = (props) => {
  const { toggleView } = props;
   const [name, setName] = useState("");
  const  [email, setEmail] = useState("");
  const  [password, setPassword] = useState("");
  const  [showSubmitError, setShowSubmitError] = useState(false);
  const  [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken, user) => {
    Cookies.set("jwt_token", jwtToken, { expires: 7 });
     Cookies.set("role", user.role, {expires : 7 })
    localStorage.setItem("UserId", user.id); // Store userId for later use
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitSignUpForm = async (event) => {
    event.preventDefault();
    const userDetails = { name, email, password };
    try {
      const response = await fetch("http://localhost:3005/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        onSubmitSuccess(data.token, data.user); // Pass userId here
      } else {
        onSubmitFailure(data.error_msg || "Registration failed");
      }
    } catch (error) {
      onSubmitFailure("Network error: " + error.message);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div className="p-6 rounded-lg bg-white dark:bg-white">
  <div className="flex items-center space-x-3 ml-24 mb-1">
    <img 
      src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1756227343/bookhub-high-resolution-logo-transparent_ubbg5q.png" 
      alt="BookHub Logo" 
      className="h-10 w-auto drop-shadow-md" 
    />
    <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-800 tracking-wide">
      BookHub
    </span>
  </div>

  <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-800">
    Create Your Account
  </h2>

  <form onSubmit={submitSignUpForm}>
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-700 font-medium mb-2" htmlFor="name-signup">
        Full Name*
      </label>
      <input
        id="name-signup"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-white text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-700 font-medium mb-2" htmlFor="email-signup">
        Email Address*
      </label>
      <input
        id="email-signup"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-white text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 dark:text-gray-700 font-medium mb-2" htmlFor="password-signup">
        Password*
      </label>
      <input
        id="password-signup"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-white text-gray-800 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSubmitError && (
        <p className="text-red-500 mt-4 text-center">{errorMsg}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
    >
      Create Account
    </button>
  </form>

  <div className="mt-4 text-center">
    <p className="text-gray-600 dark:text-gray-600 text-sm">
      Already have an account?{" "}
      <span
        onClick={toggleView}
        className="text-blue-600 dark:text-blue-600 font-medium cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
  </div>
</div>

    </>
  );
};

export default SignUpView;