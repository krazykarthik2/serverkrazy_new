import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faStopCircle } from "@fortawesome/free-solid-svg-icons";
function DeletedMessage() {
  return (
    <div className="thisisdeleted">
      <FontAwesomeIcon icon={faStopCircle} size="2x" />
      <p>This message has been deleted</p>
    </div>
  );
}

export default DeletedMessage;
