import React, { useState, useContext, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Logo from "../assets/DumbMerch.png";
import { UserContext } from "../context/userContext";
import Register from "./Register";
import { API } from "../config/api";
import { useMutation } from "react-query";

function Auth() {
  let [isOpen, setIsOpen] = useState(null);

  const [message, setMessage] = useState(null);

  function closeModal() {
    setIsOpen(false);
    console.log(isOpen);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [login, isLogin] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);

      const user = response.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      // Notification
      if (response.data.status === "success...") {
        setForm({
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full text-red max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 text-red-600 font-extrabold"
                        >
                          Login Failed
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-zinc-900">
                            Login failed, please login again. :)
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        );
        console.log("login failed");
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full text-red max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 text-red-600 font-extrabold"
                      >
                        Login Failed
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-zinc-900">
                          Login failed, please login again. :)
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      );
      console.log("login failed");
      setMessage(alert);
    }
  });

  const userlogin = () => {
    isLogin(true);
  };

  const userRegister = () => {
    isLogin(false);
  };

  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    console.log(state);
  }, [state, message]);

  return (
    <div name="about" className="w-full h-screen bg-[#020202] text-white">
      <div className="flex flex-col justify-center items-center">
        {isOpen ? message : ""}

        <div className="justify-center text-center items-center max-w-[1000px] w-full sm:grid grid-cols-2 gap-8">
          <div className="sm:text-left p-20">
            <img
              className="ml-28 sm:ml-10 w-[120px] md:w-[200px] pb-10"
              src={Logo}
              alt="Logo"
            />
            <p className="text-4xl font-bold">Easy, Fast and Realible.</p>
            <p className="font-light text-zinc-500 pt-5">
              Go shopping for merchandise, just go to dumb merch shopping. the
              biggest merchandise in Indonesia.
            </p>
            <div className="flex pt-10 space-x-10">
              <button
                className="text-white font-bold group px-10 py-1 my-2 flex items-center bg-red-500 hover:bg-red-600 rounded-md"
                type="button"
                onClick={userlogin}
              >
                Login
              </button>
              <button
                className="text-white font-bold group px-10 py-1 my-2 flex items-center hover:bg-red-500 rounded-md hover:border-pink-600"
                type="button"
                onClick={userRegister}
              >
                Register
              </button>
            </div>
          </div>

          <div className="mt-1 ml-20 md:flex justify-end mt-20">
            <div className="w-full max-w-xs">
              {login ? (
                <>
                  <form
                    className="px-10 pt-10 mb-10 bg-[#070707] rounded-lg"
                    onSubmit={(e) => handleSubmit.mutate(e)}
                  >
                    <p className="text-white text-2xl font-bold pb-5">Login</p>

                    <div className="mb-4">
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                        value={email}
                        name="email"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        onChange={handleChange}
                        value={password}
                        name="password"
                      />
                    </div>
                    <div className="flex justify-center pb-10">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={openModal}
                        // onClick={() => Navigate("/")}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <Register />
              )}
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

export default Auth;
