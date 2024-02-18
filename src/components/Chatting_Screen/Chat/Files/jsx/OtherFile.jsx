import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function OtherFile({ msg, index, _fileDelete, url }) {
  return (
    <div className="w-100 ">
      <div className="hstack">
        <Button
          className="delete"
          onClick={() => {
            _fileDelete();
          }}
        >

          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <iframe src={url} style={{ height: "100px", width: "100px" }}/>
          <Link to={url}>
            <FontAwesomeIcon icon={faLink} />
          </Link>
          <p>{msg.sender}</p>
          <p>{msg.message}</p>
        </Stack>
      </div>
    </div>
  );
}
export default OtherFile;