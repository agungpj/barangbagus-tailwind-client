import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import product1 from "../assets/product2.png";
import dumbmerch from "../assets/DumbMerch.png";
import Navbar from "../components/Navbar";
function Profile() {
  return (
    <div name="about" className="w-full h-full bg-[#020202] text-white">
      <Navbar />
      <p className="imageprofile text-red-500 text-2xl font-bold text-left pt-32 ml-44 pb-2">
        My Profile
      </p>
      <div className="text-right flex flex-wrap basis-12">
        <div className="grow-0 pl-20 pr-10">
          <img
            src={profile}
            alt="Logo Image"
            style={{ width: "338px", height: "435px" }}
          />
        </div>
        <div className="pl-5 pt-10 md:pt-0 sm:m-row items-center grow -mt-12 pb-12">
          <p className="my-4 text-left pt-7 text-red-500 text-md font-bold">
            Name
          </p>
          <p className="text-left">Agung Prasetya Jati</p>
          <p className="my-4 text-left pt-7 text-red-500 text-md font-bold">
            Email
          </p>
          <p className="text-left">agungprasetya1121@gmail.com</p>

          <p className="my-4 text-left pt-7 text-red-500 text-md font-bold">
            Phone
          </p>
          <p className="text-left">083895931234</p>

          <p className="my-4 text-left pt-7 text-red-500 text-md font-bold">
            Gender
          </p>
          <p className="text-left">Pria Sejati</p>

          <p className="my-4 text-left pt-7 text-red-500 text-md font-bold">
            Address
          </p>
          <p className="text-left">Bekasi Panas</p>
        </div>
        <div className="grow md:px-40">
          <p className="sm:pb-4 my-4 pt-7 text-center text-red-500 text-md font-bold -mt-10 mx-auto">
            My Transaction
          </p>

          <div className="spike grid grid-cols-3 sm:grid-cols-3 bg-zinc-900">
            <div className="flex justify-center items-center">
              <img
                src={product1}
                alt="Logo Image"
                style={{ width: "80px", height: "120px" }}
              />
            </div>

            <div className="pt-5">
              <p className=" text-red-500 font-bold text-md text-left">Mouse</p>
              <p className=" text-red-500 text-left text-sm">
                Kamis, 19 Mei 2022
              </p>
              <p className="text-left text-sm pt-2">Price: Rp.300.000</p>
              <p className="text-left text-sm font-bold pt-5">
                Sub-Total: Rp.300.000
              </p>
            </div>

            <div className="flex justify-end items-center pr-4">
              <img src={dumbmerch} alt="Logo Image" className="w-[50%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div name="about" className="w-full h-screen bg-[#000000ef] text-white">
//         <img src={Logo} alt="Logo Image" style={{ width: "50px" }} />

//         <p className="text-4xl font-bold inline"></p>

export default Profile;
