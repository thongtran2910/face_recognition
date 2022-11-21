import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className="mb-4 text-2xl font-semibold">
        This Lazy Brain will detect faces in your pictures. Try it.
      </p>
      <div className="h-[100px]">
        <div className="form flex justify-center w-1/2 mx-auto py-5 px-5 rounded-md  shadow-sm">
          <input
            className="w-3/4 p-2 rounded"
            type="text"
            placeholder="Insert your picture's URL"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="w-1/4 rounded bg-[#256D85] hover:bg-[#628E90] hover:scale-110 duration-300 text-white ml-2"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
