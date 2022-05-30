import React from 'react';
import './FaceRecognition.css';
import DetailTypist from '../detailstypist/detailtypist';
import GeneralInfo from '../General_Info/General_Info';
import Celebrity from '../Celebrity/Celebrity';

const FaceRecognition = ({
  box,
  imageUrl,
  generalInfo,
  showInfo,
  celebrity,
  imgRef
}) => {
  return (
    <div className="center mt0">
      <div className="absolute pa4" id="fr-el">
        <img id="image" ref={imgRef} alt="" src={imageUrl} width="500px" height="auto" />
        {box.topRow &&
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        }
        {generalInfo.length > 0 &&
          <GeneralInfo generalInfo={generalInfo} />
        }
        {showInfo.raceArr &&
          <DetailTypist showInfo={showInfo} box={box} imageUrl={imageUrl} />
        }
        {celebrity.length > 0 &&
          <Celebrity celebrity={celebrity} box={box} />
        }
      </div>
    </div>
  );
};
export default FaceRecognition;
