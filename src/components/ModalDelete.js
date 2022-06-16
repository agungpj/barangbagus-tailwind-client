import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
export default function ModalDelete({ setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <div>
      <div className="bg-white p-8 rounded z-10 shadow-xl">
        <Dialog.Panel>
          <div className="w-full max-w-xs space-x-16">
            <p>Are you sure want to delete this data ?</p>
            <button
              className="text-white my-3 text-center font-bold py-1 px-5 w-1/2 rounded focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-600"
              // onClick={() => Navigate("/")}
              onClick={handleDelete}
              type="button"
            >
              Yes
            </button>
            <button
              className="text-white text-center font-bold py-1 px-5 w-1/2 rounded focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-600"
              type="button"
              // onClick={() => Navigate("/")}
            >
              No
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </div>
  );
}
