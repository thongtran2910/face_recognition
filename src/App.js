import "./App.css";
import MouseParticles from "react-mouse-particles";
// import Clarifai from "clarifai";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const USER_ID = "thongtran2910";
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "f12a28922b694ca29cae95724ff25f50";
  const APP_ID = "face-recognition";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "general-image-recognition";
  // const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
  const IMAGE_URL = input;
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImgUrl(input);
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <MouseParticles
        g={1}
        color="random"
        cull="MuiSvgIcon-root,MuiButton-root"
        level={6}
      />
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imgUrl={input} />
    </div>
  );
}

export default App;
