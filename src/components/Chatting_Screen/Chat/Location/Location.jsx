import { faMapLocationDot, faSquareArrowUpRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
function Location({ msg, index, _delete ,pfp}) {
  
  return (
    <div className="w-100">
      <div className="hstack">
        <Button
          className="delete"
          onClick={() => {
            _delete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} /> 
        </Button>
        <Link to={`https://www.google.com/maps?q=${msg.lat},${msg.lon}`} target="_blank">
          <FontAwesomeIcon icon={faMapLocationDot} size="3x"/>
          <span>Open Map</span>
          <FontAwesomeIcon icon={faSquareArrowUpRight} size="3x"/>
        </Link>
        <Stack>
          <div className="loc-property lat"> {msg.lat} N</div>
          <div className="loc-property lon"> {msg.lon} E</div>
          <div className="loc-property acc"> {msg.acc} m</div>
        </Stack>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <p>{msg.senderName}</p>
          <p>{msg.message}</p>
          <p>{new Date(msg.time).toLocaleTimeString()}</p>
          <p>{msg.key}</p>
        </Stack>
      </div>
    </div>
  );
}
export default Location;
