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
  const [box, setBox] = useState([]);

  const USER_ID = "thongtran2910";
  const PAT = "f12a28922b694ca29cae95724ff25f50";
  const APP_ID = "face-recognition";
  const MODEL_ID = "face-detection";
  const IMAGE_URL = input;

  const calculateFaceLocation = (data) => {
    const clarifaiFaceArr = data.outputs[0].data.regions;
    const clarifaiFace = clarifaiFaceArr.map(
      (item) => item.region_info.bounding_box
    );
    const image = document.getElementById("inputImg");
    const width = Number(image.width);
    const height = Number(image.height);
    const dimension = clarifaiFace.map((i) => {
      return {
        leftCol: i.left_col * width,
        topRow: i.top_row * height,
        rightCol: width - i.right_col * width,
        bottomRow: height - i.bottom_row * height,
      };
    });
    return dimension;
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

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

      .then((result) => {
        const resultJson = JSON.parse(result);
        displayFaceBox(calculateFaceLocation(resultJson));
      })
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
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
  );
}

export default App;
