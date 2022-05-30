import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit, progress }) => {
  return (
    <div id="img-link-form">
      <p className="f4 descr" style={{ color: '#3f3', cursor: 'default' }}>
        {"Magic brain will reveal person's info in the picture"}
      </p>
      <p className="f4 descr" style={{ color: '#3f3', cursor: 'default' }}>
        {'Copy and paste image URL or upload your own'}
      </p>
      <div className="center">
        <input
          type="text"
          placeholder="url://"
          className="f4 pa2 w-50 br2"
          onChange={onInputChange}
          id="input-link"
        />
        <button
          className="btn f4 w-15 grow link dim black ph3 pv2 dib white bg-purple"
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
      <div className="center mt3">
        {progress > 0 ? <span>Loading... Please Wait...</span> : null}
        {progress > 0 ? <progress value={progress} max="100" /> : null}
      </div>
    </div>
  );
};

export default ImageLinkForm;
