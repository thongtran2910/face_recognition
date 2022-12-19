import React, { useState } from "react";
import FaceRecognition from "../../components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm";
import Logo from "../../components/Logo/Logo";
import Navigation from "../../components/Navigation/Navigation";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();

  const USER_ID = "thongtran2910";
  const PAT = "f12a28922b694ca29cae95724ff25f50";
  const APP_ID = "face-recognition";
  const MODEL_ID = "face-detection";
  const IMAGE_URL = input;

  const calculateFaceLocation = (data) => {
    const clarifaiFaceArr = data.outputs[0].data.regions;
    if (clarifaiFaceArr) {
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
    } else {
      console.log("missing url");
    }
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    if (location.state?.user) {
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
        .catch((error) => {
          console.log(error);
        });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Navigation name={location.state?.user?.name} />
      <Logo />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <Modal
        onCancel={() => setModalOpen(false)}
        footer={null}
        closable={false}
        open={modalOpen}
        width={400}
      >
        <p className="font-bold text-center text-xl">
          Please <a href="/signin">Sign in</a> first
        </p>
      </Modal>
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </>
  );
}
