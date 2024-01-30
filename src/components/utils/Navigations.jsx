import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function Back() {
  return (
    <Link to=".." className="back" accessKey="b">
      <FontAwesomeIcon icon={faArrowLeft} size="2x" />
    </Link>
  );
}
function To_chat({ serverName }) {
  return (
    <Link to={"/server/" + serverName + "/chat"} className="back" accessKey="G">
      <FontAwesomeIcon icon={faArrowRight} size="2x" />
    </Link>
  );
}
export { Back, To_chat  };
