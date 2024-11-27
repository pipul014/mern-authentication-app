import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false); // New state for loading

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error if the user starts typing in the input
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.cpassword) newErrors.cpassword = "Confirm Password is required";
    if (formData.password !== formData.cpassword) newErrors.cpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const response = await fetch(`http://localhost:3009/userAuth/v1/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
        toast.success(res.message || "Registration Successful!", { position: "top-center" });
        navigate("/login");
      } else {
        if (response.status === 400) {
          toast.error(res.message || "This user already exists", { position: "top-center" });
        } else {
          toast.error(res.message || "Registration failed. Please try again.", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.", { position: "top-center" });
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.cpassword && <p className="text-sm text-red-500">{errors.cpassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Signing up..." : "Sign Up"} {/* Show loading text while waiting */}
          </button>

          <div className="flex mt-2">
            <p>Already have an account?</p>
            <span
              onClick={() => navigate("/login")}
              className="text-blue-700 cursor-pointer hover:underline ml-2"
            >
              Log In
            </span>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
