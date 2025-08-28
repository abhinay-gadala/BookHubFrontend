import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import { CiPhone } from "react-icons/ci";
import { useNavigate, Navigate } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    dateOfBirth: "",
    bio: "",
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("jwt_token");
        const userId = localStorage.getItem("UserId"); // ✅ Get from localStorage

        if (!token || !userId) {
          setError("⚠️ Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:3005/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          phonenumber: data.phonenumber || "",
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          bio: data.bio || "",
        });
      } catch (err) {
        setError("⚠️ Unable to load user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("jwt_token");
      const userId = localStorage.getItem("UserId"); // ✅ Use stored id

      if (!token || !userId) throw new Error("Session expired. Please login again.");

      const updateData = { ...userData };
      if (password) updateData.password = password;

      const response = await fetch(
        `http://localhost:3005/api/users/updates/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("✅ Profile updated successfully!");
        setPassword("");
      } else {
        alert("❌ " + (result.message || "Failed to update"));
      }
    } catch (error) {
      alert("❌ Error updating user: " + error.message);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("userId"); // ✅ clear stored id
    navigate("/login");
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <span className="text-lg text-red-500 mb-4">{error}</span>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
     <div className="min-h-screen flex items-center justify-center bg-white py-10 px-6 font-sans">
  <div className="flex flex-col lg:flex-row gap-10 items-center w-full max-w-6xl">
    {/* Left Image */}
    <img
      src="https://img.freepik.com/premium-vector/books-set-with-people-reading-taking-info_87689-1395.jpg?semt=ais_hybrid&w=740&q=80"
      alt="Books"
      className="w-full lg:w-1/2 rounded-2xl object-cover"
    />

    {/* Account Settings Card */}
    <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-wide">
        Account Settings
      </h1>

      <form onSubmit={handleSaveChanges} className="space-y-7">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phonenumber"
              value={userData.phonenumber}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
            <CiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg" />
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Change Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
            Bio
          </label>
          <textarea
            name="bio"
            rows="4"
            value={userData.bio}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm resize-none"
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Save Changes
        </button>
      </form>

      {/* Logout */}
      <div className="mt-8 border-t pt-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold text-lg hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default SettingsPage;
