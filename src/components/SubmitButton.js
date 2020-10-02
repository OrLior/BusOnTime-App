import React from "react";

const SubmitButton = ({ submitHandler }) => {
  return (
    <button onClick={submitHandler} className="submit-button" type="submit">
      <i className="fas fa-chevron-right"></i>
    </button>
  );
};

export default SubmitButton;
