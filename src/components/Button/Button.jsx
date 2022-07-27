import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function CustomButton({ text, onClick }) {
  return (
    <div className="container">
      <div className="center">
        <button type="button" className="btn" onClick={onClick}>
          <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span style={{ fontSize: 24 }}>{text}</span>
        </button>
      </div>
    </div>
  );
}

CustomButton.defaultProps = {
  onClick: null,
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;
