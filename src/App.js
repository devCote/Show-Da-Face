import React, { useState, useRef } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import {
  faceDetectModel,
  demographicsModel,
  generalModel,
  celebrityModel,
} from './clarifai/clarifai.fetch';
import Particles from 'react-tsparticles';
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

// *** ACTUAL COMPONENT MAIN HOOK FUNC ***

const App = () => {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [generalInfo, setGeneralInfo] = useState({});
  const [progress] = useState(0);
  const [celebrity, setCelebrity] = useState({});
  const [showInfo, setShowInfo] = useState({});
  const [coordinates, setCoordinates] = useState({});
  const [box, setBox] = useState({});
  const [loading, setLoading] = useState(false)
  const imgRef = useRef()

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  React.useEffect(() => {
    const handleResize = () => setBox(calculateFaceLocation(coordinates));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const calculateFaceLocation = (coordinates) => {
    const image = document.getElementById('image');
    const imageRect = image.getBoundingClientRect();
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: coordinates.left_col * width + 32,
      topRow: coordinates.top_row * height + 32,
      rightCol: width - coordinates.right_col * width + 32,
      bottomRow: height - coordinates.bottom_row * height + 32,
      infoBoxLeft:
        coordinates.right_col * width + imageRect.left - imageRect.x + 32,
      infoBoxTop: coordinates.top_row * height + 32,
      celebLeft:
        coordinates.left_col * width + imageRect.left - imageRect.x + 32,
      celebBotom: coordinates.bottom_row * height + 32 + 4,
    };
  };

  const onSubmit = async () => {
    if (!submitRulesCheck(input)) return;
    setLoading(true)
    setImgUrl(input);
    // run func to display face
    const coordinatesFromModel = await faceDetectModel(input);
    setCoordinates(coordinatesFromModel);
    setBox(calculateFaceLocation(coordinatesFromModel));
    setGeneralInfo(await generalModel(input));
    setShowInfo(await demographicsModel(input));
    setCelebrity(await celebrityModel(input));
    setLoading(false)
  };

  const handleInputRulesBrake = () => {
    const input = document.getElementById('input-link');
    input.setCustomValidity('URL YOU HAVE PROVIDED IS INVALID');
    input.reportValidity();
    setInput(null);
    input.value = '';
    return false;
  };

  function submitRulesCheck(string) {
    try {
      new URL(string);
    } catch (_) {
      return handleInputRulesBrake();
    }
    if (!string || string.trim().length === 0) {
      return handleInputRulesBrake();
    } else return true;
  }

  function handleRefresh() {
    setInput(null)
    setImgUrl(null)
    setGeneralInfo({})
    setCelebrity({})
    setShowInfo({})
    setCoordinates({})
    setBox({})
    setLoading(false)
  }

  const particlesInit = (main) => {
    loadFull(tsParticles);
  };

  return (
    <div className="App tc white">
      <Particles className='particles' url="/particles.json" init={particlesInit} />
      <Navigation title={showInfo.ageArr ? 'Result' : 'Welcome'} />
      {!box.topRow && (
        <>
          <Logo />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            progress={progress}
          />
        </>
      )}
      <FaceRecognition
        box={box}
        imageUrl={imgUrl}
        imgRef={imgRef}
        showInfo={showInfo}
        generalInfo={generalInfo}
        celebrity={celebrity}
      />
      {box.topRow ?
        <Navigation
          title={showInfo.ageArr && 'Return'}
          marginTop={imgRef.current.attributes.height.ownerElement.height + 55}
          cursor={'pointer'}
          refresh={handleRefresh}
          border={'green 2px solid'} /> : null}
    </div>
  );
};

// *** MAIN APP EXPORT

export default App;
