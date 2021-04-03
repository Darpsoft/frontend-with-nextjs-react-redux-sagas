import React from "react";

const Lateral = ({ title, description }) => {
  return (
    <div className="gx-app-logo-content">
      <div className="gx-app-logo-content-bg"></div>
      <div className="gx-app-logo-wid">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Lateral;
