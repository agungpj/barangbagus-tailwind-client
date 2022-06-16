import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";

const AddProduct = () => {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div name="home" className="w-full bg-[#020202] h-full">
      <NavbarAdmin />
      {/* Container */}
      <div className="mx-auto px-8 h-full max-w-full">
        <p className="text-white text-2xl font-bold pt-32 pb-2 pl-10">
          Add Product
        </p>
        <form className="px-10" onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}
          <div className="mb-4">
            <input
              className="form-control block w-[100%] mt-10
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="upload"
              name="image"
              onChange={handleChange}
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 my-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Add Name ..."
              name="name"
              onChange={handleChange}
            />
            <input
              className="shadow appearance-none border rounded w-full px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline py-20"
              id="username"
              type="text"
              placeholder="Add Desc ..."
              name="desc"
              onChange={handleChange}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="number"
              placeholder="Add Price ..."
              name="price"
              onChange={handleChange}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="number"
              placeholder="Add Quantity ..."
              name="qty"
              onChange={handleChange}
            />
          </div>
          <div className="bg-zinc-900 bg-opacity-75 text-white mt-4 px-2 py-1 pb-2 rounded-md">
            <div className="text-white font-bold  mb-1 text-lg flex justify-center pb-5">
              Category
            </div>

            {categories?.map((item, index) => (
              // <label className="checkbox-inline me-4" key={index}>
              //   <input
              //     type="checkbox"
              //     value={item.id}
              //     onClick={handleChangeCategoryId}
              //   />{" "}
              //   {item.name}
              // </label>
              <div className="form-check" key={index}>
                <label
                  className="form-check-label inline-block text-white font-bold"
                  key={index}
                >
                  <input
                    className=" form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    type="checkbox"
                    value={item.id}
                    id="flexCheckDefault"
                    onClick={handleChangeCategoryId}
                  />

                  {item.name}
                </label>
              </div>
            ))}
          </div>

          <button
            className="bg-green-500 hover:bg-green-600 my-10 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
