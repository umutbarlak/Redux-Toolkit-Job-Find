import React from "react";

const DelButton = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete} className="bin-button">
      <img className="bin-top" src="/icon1.svg" />
      <img className="bin-bottom" src="/icon2.svg" />
      <img className="garbage" src="/icon3.svg" />
    </button>
  );
};

export default DelButton;
