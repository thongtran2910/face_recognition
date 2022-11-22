import React from "react";
import "./FaceRecognition.css";

export default function FaceRecognition({ imgUrl, box }) {
  return (
    <div className="flex justify-center">
      <div className="absolute">
        <img
          id="inputImg"
          className="w-[400px] sm:w-[500px] sm:h-auto"
          src={imgUrl}
          alt=""
        />
        {box.map((item, index) => {
          return (
            <div
              key={index}
              className="bounding-box"
              style={{
                left: item.leftCol,
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
