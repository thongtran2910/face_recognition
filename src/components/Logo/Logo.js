import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.scss";

export default function Logo() {
  return (
    <Tilt
      className="track-on-window"
      perspective={500}
      glareEnable={false}
      glareMaxOpacity={0}
      glarePosition="all"
      scale={1.02}
      trackOnWindow={true}
    >
      <div className="inner-element">
        <img id="pic-1" src="./img/brain-illness.png" alt="brain-illness" />
        <img
          id="pic-2"
          className="hidden"
          src="./img/brain-health.png"
          alt="brain-health"
        />
      </div>
    </Tilt>
  );
}
