import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Product2 from "../assets/product2.png";
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";

// API config
import { API } from "../config/api";
const Productid = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  // Fetching product data from database
  let { data: product, refetch } = useQuery("Cache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/product/" + id, config);
    return response.data.data;
  });

  // Create config Snap payment page with useEffect here ...
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-6QY1_88EBpBwwYJt";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", "SB-Mid-client-6QY1_88EBpBwwYJt");

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async () => {
    try {
      // Get data from product
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", config);

      // Create variabel for store token payment from response here ...
      const token = response.payment.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div name="home" className="parent wrap w-[90%] h-screen bg-[#020202]">
      <Navbar />
      {/* Container */}
      <div className="child-1 res-child-1">
        <img
          src={product?.image}
          alt="Logo Image"
          style={{ width: "436px", height: "555px" }}
          className="object-cover"
        />
      </div>

      <div className="child-2 res-child-2 pb-20">
        <div className="text-red-600 text-3xl font-extrabold py-3">
          <p>{product?.name}</p>
        </div>
        <p className="text-white">Stock: {product?.qty}</p>

        <div className="text-white py-5">{product?.desc}</div>
        <div className="text-white py-3 text-justify">
          <p>{product?.desc}</p>
        </div>
        <div className="text-red-600 text-xl font-bold py-2 flex justify-end pb-5">
          <p> {convertRupiah.convert(product?.price)}</p>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-center font-bold pt-2 w-full rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => handleBuy.mutate()}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Productid;
