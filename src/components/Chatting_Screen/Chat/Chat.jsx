import { faStopCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import user_svg from "../../../assets/user.svg";
import { CasualTime } from "./Files/jsx/ImageFile";
function Chat({ msg, index, _delete }) {
  console.log(msg);
  return (
    <div className="w-100 d-flex justify-content-end">
      <div className="d-flex ">
        <div className="d-center actions">
          <Button
            className="delete"
            onClick={() => {
              _delete();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
        <div className="d-flex flex-column align-items-end bg-glass border border-3 border-glass rounded-3 p-2">
          <div className="d-flex flex-column msg-body">
            <p className="w-100 min-w-px-40">
              {msg.message.split("\n").map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
              <div className="text-nowrap opacity-50 font-px-8">{msg.key}</div>
            </p>
            <div className="sender-text">
              <div>{msg.senderName}</div>
              <div className="text-nowrap d-none">{msg.sender}</div>
            </div>
          </div>

          <div className="time text-end">
            <CasualTime time={msg.time} />
          </div>
        </div>
        <div className="user-select-none sender-cont d-flex align-items-end p-2">
          <img
            src={msg.senderPhoto || user_svg}
            width={"30px"}
            height={"30px"}
            className="rounded-circle bg-glass"
            alt="Sender"
          />
        </div>
      </div>
    </div>
  );
}
export { Chat };
