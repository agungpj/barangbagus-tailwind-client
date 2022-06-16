import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import NavbarAdmin from "../components/NavbarAdmin";
import { API } from "../config/api";

const AddCategory = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify({ name: category });

      // Insert category data
      const response = await API.post("/category", body, config);

      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div name="home" className="w-full h-screen bg-[#020202]">
      <NavbarAdmin />
      {/* Container */}
      <div className="mx-auto px-8 h-full max-w-full">
        <p className="text-white text-2xl font-bold pt-32 pb-10 pl-10">
          Edit Category
        </p>
        <form className="px-10" onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              placeholder="category"
              value={category}
              name="category"
              type="text"
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 my-10 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
            // onClick={() => Navigate("/")}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
