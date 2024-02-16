import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function ShowBool({ value }) {
  return (
    <>
      <FontAwesomeIcon icon={value ? faCheck : faClose} />
    </>
  );
}

export default ShowBool;
