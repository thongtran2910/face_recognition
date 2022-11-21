import React from "react";

export default function FaceRecognition({ imgUrl }) {
  return (
    <div className="flex justify-center">
      <img className="max-w-[400px] sm:max-w-[500px]" src={imgUrl} alt="" />
    </div>
  );
}
