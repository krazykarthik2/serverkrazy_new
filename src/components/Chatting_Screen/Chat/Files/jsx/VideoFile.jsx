import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function VideoFile({ msg, index, _fileDelete, url }) {
  return (
    <div className="w-100 h-100">
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
          <Link to={url}>
            <FontAwesomeIcon icon={faLink} />
          </Link>
          <video src={url} controls />
          <p>{msg.sender}</p>
          <p>{msg.message}</p>
        </Stack>
      </div>
    </div>
  );
}

export default VideoFile;