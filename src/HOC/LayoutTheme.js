import React from "react";
import MouseParticles from "react-mouse-particles";
import ParticlesBg from "particles-bg";

export default function LayoutTheme({ Component }) {
  return (
    <div>
      <MouseParticles
        g={1}
        color="random"
        cull="MuiSvgIcon-root,MuiButton-root"
        level={6}
      />
      <ParticlesBg type="cobweb" bg={true} />
      <Component />
    </div>
  );
}
