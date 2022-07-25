import React from 'react';
import './Button.css';

function CustomButton(textFromOutside) {
  const { text } = textFromOutside;
  return (
    <div className="container">
      <div className="center">
        <button type="button" className="btn">
          <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span style={{ fontSize: 24 }}>{text.message}</span>
        </button>
      </div>
    </div>
  );
}

export default CustomButton;
