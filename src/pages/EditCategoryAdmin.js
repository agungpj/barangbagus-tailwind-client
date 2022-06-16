import React, { useState, useEffect } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "" });

  // Fetching category data by id from database
  let { data: categoryData } = useQuery("categoryCache", async () => {
    const response = await API.get("/category/" + id);
    return response.data.data.name;
  });
  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };
  useEffect(() => {
    if (categoryData) {
      console.log(categoryData);
      setCategory({ name: categoryData });
    }
  }, [categoryData]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      await API.patch("/category/" + id, body, config);

      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div name="home" className="w-full h-screen bg-[#020202]">
      <Navbar />
      {/* Container */}
      <div className="mx-auto px-8 h-full max-w-full">
        <p className="text-white text-2xl font-bold pt-32 pb-10 pl-10">
          Edit Category
        </p>
        <form className="px-10" onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Edit Category ..."
              onChange={handleChange}
              value={category?.name}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 my-10 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
            // onClick={() => Navigate("/")}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
