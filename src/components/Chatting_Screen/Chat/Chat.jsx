import {
  faCheck,
  faCopy,
  faStopCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import user_svg from "../../../assets/user.svg";
import { CasualTime } from "./Files/jsx/ImageFile";
function Chat({ msg, index, _delete, pfp }) {
  console.log(":"+index+"=>"+pfp);


  const [copied, setCopied] = React.useState(false);

  useEffect(() => { 
    if (copied) { 
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);
  return (
    <div className="w-100 d-flex justify-content-end">
      <div className="d-center">
        <div className="d-center actions flex-wrap justify-content-between">
          <div className="act-del">
            <Button
              className="delete"
              onClick={() => {
                _delete();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end bg-glass border border-3 border-glass rounded-3 p-2">
          <div className="d-flex flex-column msg-body">
            <p className="w-100 min-w-px-40">
              {msg.message.split("\n").map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
              <div className="text-nowrap opacity-50 font-px-8">{msg.key}</div>
            </p>
            <div className="d-flex justify-content-between">
              <div className="act-copy">
                <button
                  className="copy btn text-white p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(msg.message);
                    setCopied(true);
                  }}
                >
                  {copied ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </button>
              </div>
 
              <div className="sender-text">
                <div>{msg.senderName}</div>
                <div className="text-nowrap d-none">{msg.sender}</div>
              </div>
            </div>
          </div>

          <div className="time text-end">
            <CasualTime time={msg.time} />
          </div>
        </div>
        <div className="user-select-none sender-cont d-flex align-items-end p-2">
          <img
            src={pfp}
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
