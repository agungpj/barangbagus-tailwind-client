import React from "react";
import { Link } from "react-router-dom";
import convertRupiah from "rupiah-format";

export default function ProductCard({ item }) {
  return (
    <Link to={`/product/` + item.id} className="col text-decoration-none">
      <div className="w-[13rem] h-[22rem] rounded-md sm:shadow-md shadow-[#040c16] w-[14rem] h-[24rem] bg-[#0b0b0b] hover:scale-105 duration-500">
        <img src={item.image} alt={item.name} />
        <p className="font-bold text-lg py-1 text-red-600">{item.name}</p>
        <p className="text-white">{convertRupiah.convert(item.price)}</p>
        <p className="text-white">{item.qty}</p>
      </div>
    </Link>
  );
}
