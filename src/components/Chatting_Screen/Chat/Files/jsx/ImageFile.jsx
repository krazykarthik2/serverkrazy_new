import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import user_svg from "../../../../../assets/user.svg";

function ImageFile({ msg, index, _fileDelete, url,pfp }) {
  return (
    <div className="w-100 d-flex justify-content-end">
      <div className="d-flex ">
        <div className="d-center actions  gap-2">
          <div className="act-del">
            <Button
              className="delete"
              onClick={() => {
                _fileDelete();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <div className="act-link">
            <Link to={url} target="_blank">
              <FontAwesomeIcon icon={faLink} />
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end bg-glass border border-3 border-glass rounded-3 p-2">
          <div className="d-flex flex-column msg-body">
            <div className="w-100 min-w-px-40 vstack align-items-end">
              <img
                src={url}
                className="url-resource-file-chat rounded "
                style={{ height: "100px", width: "100px" }}
              />

              <p className="m-0">
                {msg.message.split("\n").map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))}
              </p>
              <div className="text-nowrap opacity-50 font-px-8">{msg.key}</div>
            </div>
            <div className="sender-text">
              <div>{msg.senderName}</div>
              <div className="text-nowrap d-none">{msg.sender}</div>
            </div>
          </div>

          <div className="time text-end">
            <div>
              <CasualTime time={msg.time} />
            </div>
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
let CasualTime = ({ time }) => {
  try {
    let t = new Date(time).toLocaleTimeString().split(":");
    let d = new Date(time).toLocaleDateString().split("/");
    let isToday = new Date() - new Date(time) < 86400000;
    return (
      <div className="d-flex flex-column">
        <div className="t">
          {t[0]}:{t[1]} {t[2].slice(2)}
        </div>
        {isToday || (
          <div className="d">
            {d[0]}-{d[1]}-{d[2]}
          </div>
        )}
      </div>
    );
  } catch (e) {
    console.log(e);
  }
};
export default ImageFile;
export { CasualTime };
