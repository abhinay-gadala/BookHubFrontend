import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import TopRatedBooks from "./TopRatedBooks";



const Home = () => {

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
        <div className="text-center py-16 px-4 sm:px-8 bg-white dark:bg-[#18191A]">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
        Find Your Next Favorite Books?
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you surprisingly insightful recommendations.
      </p>
      <TopRatedBooks />
    </div>
      <Footer />
    </>
  );
};

export default Home;

