import { Button, Modal } from "antd";
import React, { useState } from "react";

export default function Navigation({ name }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButton = () => {
    window.location.href = "/signin";
  };

  const handleLogout = () => {
    setModalOpen(true);
  };

  return (
    <>
      {name ? (
        <div className="flex justify-end items-center">
          <p className="text-xl font-bold p-3">Hello, {name}</p>
          <span
            onClick={handleLogout}
            className="mx-3 text-red-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </span>
          {/* <div className="user__box">
              <p
                className="hover:bg-slate-200 px-2 my-2 cursor-pointer"
                onClick={handleButton}
              >
                Log out
              </p>
            </div> */}
        </div>
      ) : (
        <div className="flex justify-end">
          <button onClick={handleButton} className="text-lg font-bold p-3">
            Sign In
          </button>
        </div>
      )}
      <Modal
        onCancel={() => setModalOpen(false)}
        // onOk={() => {
        //   window.location.href = "/signin";
        // }}
        // okButtonProps="default"
        footer={null}
        closable={false}
        open={modalOpen}
        width={400}
      >
        <p className="font-bold text-center text-xl">
          Do you really want to log out?
        </p>
        <div className="text-center mt-3 space-x-3">
          <Button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/signin";
            }}
            className="bg-blue-500 text-white"
          >
            Sure
          </Button>
        </div>
      </Modal>
    </>
  );
}
