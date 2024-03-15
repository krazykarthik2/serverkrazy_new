import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faContactBook,
  faFile,
  faHeadphones,
  faImage,
  faLocationDot,
  faLocationPin,
  faPaperPlane,
  faPaperclip,
  faSmile,
  faTerminal,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "../../../../utilites";
import InputElement from "../InputElement/InputElement";
import Terminal from "../../../Terminal/Terminal";
import { TerminalCxt } from "../../../App";
import { useLocation } from "react-router-dom";
import "./index.sass";

const emojis_raw = ["😊", "😂", "🤣"];
function givemeSet(emojis, n) {
  let emojiArrays = [];
  const randOrder = emojis.sort(() => Math.random() - 0.5);
  for (let i = 0; i < randOrder.length / n; i++) {
    emojiArrays.push(randOrder.slice(i * n, (i + 1) * n));
  }
  return emojiArrays;
}
let emojiSet = givemeSet(emojis_raw, 5);
window.emojiSet = emojiSet;
function InputType({ server, className }) {
  const [msg, setMsg] = useState("");
  const [fileShareVisible, setFileShareVisible] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false); // [setEmojiVisible]
  const location = useLocation();
  useEffect(() => {
    if (location.state?.messageTyped) {
      setMsg(new String(location.state.messageTyped));
      terminalCxt.setTerminalVisibility(false);
    }
  }, [location]);

  function shareLocation() {
    server.sendLocation(msg);
  }
  function handleMsgInput(e) {
    console.log(e);
    e.preventDefault();
    if (!msg) return;
    server.sendMessage(msg);
    setMsg("");
  }
  const terminalCxt = useContext(TerminalCxt);

  function handleFile(e) {
    Array.from(e.target.files).forEach((file) => {
      console.log(file);

      server.sendFile(msg, file);
    });
  }
  return (
    <div className={"inputtype " + className}>
      <Form onSubmit={handleMsgInput}>
        {fileShareVisible && (
          <div className="fileshare-cont">
            <div className="other-cont  ">
              <div className="other">
                <Button
                  onClick={() => shareLocation()}
                  className="bg-transparent border-0"
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="2x"
                    color="#9f8"
                  />
                </Button>
                <FormGroup controlId="audioFile">
                  <FormLabel>
                    <FontAwesomeIcon icon={faHeadphones} size="2x" />
                  </FormLabel>
                  <Form.Control
                    multiple
                    type="file"
                    hidden
                    accept="audio/*"
                    onChange={handleFile}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="file-cont  ">
              <div className="file">
                <FormGroup controlId="videoFile">
                  <FormLabel>
                    <FontAwesomeIcon icon={faVideo} size="2x" />
                  </FormLabel>
                  <Form.Control
                    multiple
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={handleFile}
                  />
                </FormGroup>
                <FormGroup controlId="photoFile">
                  <FormLabel>
                    <FontAwesomeIcon icon={faImage} size="2x" />
                  </FormLabel>
                  <Form.Control
                    multiple
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFile}
                  />
                </FormGroup>{" "}
                {isMobile() && (
                  <FormGroup controlId="photoFileCapture">
                    <FormLabel>
                      <FontAwesomeIcon icon={faCamera} size="2x" />
                    </FormLabel>
                    <Form.Control
                      capture="user"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFile}
                    />
                  </FormGroup>
                )}
                <FormGroup controlId="formFile">
                  <FormLabel>
                    <FontAwesomeIcon icon={faFile} size="2x" />
                  </FormLabel>
                  <Form.Control
                    multiple
                    type="file"
                    hidden
                    accept="*"
                    onChange={handleFile}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        )}
        {emojiVisible && (
          <div className="emojis-cont">
            <div className="emojis">
              {emojiSet.map((emojis, index_emoji) => (
                <div className="emoji-row" key={index_emoji}>
                  {emojis.map((emoji) => (
                    <button
                      type="button"
                      className="btn emoji"
                      onClick={() => setMsg((e) => e + emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        {terminalCxt.isVisible ? (
          <Terminal prompt="$chat>" />
        ) : (
          <div className="p-4">
            <div className="kb-input-row">
              <button
                onClick={() => {
                  setFileShareVisible(false);
                  setEmojiVisible((e) => !e);
                }}
                className="emoji-btn btn act-btn"
              >
                <FontAwesomeIcon
                  icon={faSmile}
                  size="2x"
                  className="act-icon"
                />
              </button>

              <InputElement {...{ msg, setMsg, handleMsgInput }} />

              <button
                className="clip-btn btn act-btn"
                onClick={() => {
                  setEmojiVisible(false);
                  setFileShareVisible((e) => !e);
                }}
              >
                <FontAwesomeIcon
                  icon={faPaperclip}
                  size="2x"
                  color="#054c6c"
                  className="act-icon"
                />
              </button>
              <button type="submit" className="send-btn btn act-btn">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="2x"
                  color={"#1c1c1c"}
                  className="act-icon"
                />
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default InputType;
