import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { API } from "../config/api";
import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [datas, setDatas] = useState([]);

  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    console.log(response);
    let fetchfilter = response.data.data;
    return setDatas(fetchfilter);
  });

  const [search, setSearch] = useState("");
  let filterProducts = datas.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div name="home" className=" bg-[#020202] h-[100%]">
      <Navbar />
      {/* Container */}
      <div className="w-screen sm:mx-auto max-w-[1150px] px-8 flex flex-col h-full p-0 m-0">
        <div className="pt-40 pb-10">
          <p className="text-white font-bold text-3xl">Products</p>
        </div>
        <div className="wrap">
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="searchButton">
              <FaSearch className="pl-2" />
            </button>
          </div>
        </div>
        {products?.length != 0 ? (
          <div className="w-full mr-15 grid grid-cols-2 gap-x-5 sm:grid-cols-4 text-center py-8 gap-y-10 gap-x-4 pr-0">
            {filterProducts?.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <h1>No Data</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
