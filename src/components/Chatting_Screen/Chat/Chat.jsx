import { faStopCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import user_svg from "../../../assets/user.svg";
function Chat({ msg, index, _delete }) {
  console.log(msg);
  return (
    <div className="w-100">
      <div className="d-flex">
        <div>
          <Button
            className="delete"
            onClick={() => {
              _delete();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <p>
            {msg.message.split("\n").map((msg) => (
              <div>{msg}</div>
            ))}
          </p>
        </Stack>
        <Stack className="user-select-none">
          <p>{msg.senderName}</p>
          <p>{msg.sender}</p>
          <p>{new Date(msg.time).toLocaleTimeString()}</p>
          <div className="text-nowrap">{msg.key}</div>
        </Stack>
        <Stack>
          <div>
            <img src={msg.senderPhoto||user_svg} width={"50px"} height={"50px"} className="rounded-circle bg-glass" />
          </div>
        </Stack>
      </div>
    </div>
  );
}
export { Chat };
