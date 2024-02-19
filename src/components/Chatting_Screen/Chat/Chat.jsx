import { faStopCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
function Chat({ msg, index, _delete }) {
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
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <p>{msg.senderName}</p>
          <p>
            {msg.message.split("\n").map((msg) => (
              <div>{msg}</div> 
            ))}
          </p>
          <p>{new Date(msg.time).toLocaleTimeString()}</p>
          <p>{msg.key}</p>
        </Stack>
      </div>
    </div>
  );
}
export { Chat };
