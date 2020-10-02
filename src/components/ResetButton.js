import React from "react";

const ResetButton = ({ submitHandler }) => {
  return (
    <button onClick={submitHandler} className="submit-button" type="submit">
      <i className="fas fa-undo"></i>
    </button>
  );
};

export default ResetButton;
