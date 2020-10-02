import React from "react";

const ToggleButton = ({ selected, toggleSelected, onWording, offWording }) => {
  return (
    <div className="toggle-container" onClick={toggleSelected}>
      <div className={`dialog-button ${selected ? "" : "disabled"}`}>
        {selected ? onWording : offWording}
      </div>
    </div>
  );
};

export default ToggleButton;
