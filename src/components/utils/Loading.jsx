import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Loading({ className = "", size = "2x",loadingText="Loading" }) {
  return (
    <div className={"loading" + className}>
      
      <div className="spinner d-center">
        <FontAwesomeIcon icon={faSpinner} spin size={size} />

      </div>
      <div className="loadingText">{loadingText}</div>
    </div>
  );
}

export default Loading;
