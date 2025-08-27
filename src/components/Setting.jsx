import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import { CiPhone } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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
          phoneNumber: data.phoneNumber || "",
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
      <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4 font-sans">
        <div className="flex flex-row gap-8 items-center w-full max-w-5xl">
          <img
            src="https://img.freepik.com/premium-vector/books-set-with-people-reading-taking-info_87689-1395.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Books"
            className="w-1/2 rounded-lg object-cover"
          />
          <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Account Settings
            </h1>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <CiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Change Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={userData.bio}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Save Changes
              </button>
            </form>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-300"
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
