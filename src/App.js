import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Home from "./pages/Home";
import Productid from "./pages/Productid";
import CategoryAdmin from "./pages/CategoryAdmin";
import EditCategoryAdmin from "./pages/EditCategoryAdmin";
import EditProductAdmin from "./pages/EditProductAdmin";
import AddCategoryAdmin from "./pages/AddCategory";
import AddProductAdmin from "./pages/AddProduct";
import Profile from "./pages/Profile";
import Complain from "./pages/Complain";
import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import ProductAdmin from "./pages/ProductAdmin";
// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/auth");
    } else {
      if (state.user.status === "admin") {
        navigate("/product");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Productid />} />
        <Route
          exact
          path="/update-category/:id"
          element={<EditCategoryAdmin />}
        />
        <Route
          exact
          path="/update-product/:id"
          element={<EditProductAdmin />}
        />
        <Route exact path="/add-category" element={<AddCategoryAdmin />} />
        <Route exact path="/add-product" element={<AddProductAdmin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/complain" element={<Complain />} />
        <Route path="/product" element={<ProductAdmin />} />
        <Route path="/category" element={<CategoryAdmin />} />
      </Route>
    </Routes>
  );
};

export default App;
