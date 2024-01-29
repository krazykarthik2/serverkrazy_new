import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function Back() {
  return (
    <Link to=".." className="back">
      <FontAwesomeIcon icon={faArrowLeft} size="2x" />
    </Link>
  );
}
function ServerInfo_to_chat() {
  return (
    <Link to="chat" className="back">
      <FontAwesomeIcon icon={faArrowRight} size="2x" />
    </Link>
  );
}
export { Back, ServerInfo_to_chat };

