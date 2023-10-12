import React from "react";

function MusicPlayerPopup({ songUrl, onClose }) {
  return (
    <div className="music-popup p-3">
      <div className="music-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <audio controls>
          <source src={songUrl} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}

export default MusicPlayerPopup;
