import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

export default function Logo() {
  return (
    <div className="logo">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa2">
          <img
            className="backgr"
            alt="brain"
            src={brain}
            style={{ width: '100%', height: '100%' }}
          ></img>
        </div>
      </Tilt>
    </div>
  );
}
