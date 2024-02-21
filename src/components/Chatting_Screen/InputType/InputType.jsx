import React, { useContext, useState  } from "react";
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
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "../../../utilites";
import InputElement from "./InputElement";
import Terminal from "../../Terminal/Terminal";
import { TerminalCxt } from "../../App";

const emojis_raw = ["😊", "😂", "🤣"];
function givemeSet(emojis, n) {
  let emojiArrays = [];
  for (let i = 0; i < n; i++) {
    emojiArrays.push(
      emojis.sort(() => Math.random() - 0.5).slice(i * n, (i + 1) * n)
    );
  }
  return emojiArrays;
}
let emojiSet = givemeSet(emojis_raw, 5);
function InputType({ server, className }) {
  const [msg, setMsg] = useState("");
  const [fileShareVisible, setFileShareVisible] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false); // [setEmojiVisible]

  function shareContacts() {
    server.sendContacts();
  }
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
  const terminalcxt = useContext(TerminalCxt);

  function handleFile(e) {
    Array.from(e.target.files).forEach((file) => {
      console.log(file);

      server.sendFile(msg, file);
    });
  }
  return (
    <div className={className}>
      <Form onSubmit={handleMsgInput}>
        {fileShareVisible && (
          <div>
            <div className="hstack justify-content-evenly">
              <Button
                onClick={() => shareContacts()}
                className="bg-transparent border-0"
              >
                <FontAwesomeIcon icon={faContactBook} size="2x" color="#9f8" />
              </Button>

              <Button
                onClick={() => shareLocation()}
                className="bg-transparent border-0"
              >
                <FontAwesomeIcon icon={faLocationDot} size="2x" color="#9f8" />
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
            <div className="hstack justify-content-evenly">
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
        )}
        {emojiVisible && (
          <div>
            <div className="emojis">
              {emojiSet.map((emojis) => (
                <div className="hstack justify-content-evenly">
                  {emojis.map((emoji) => (
                    <Button onClick={() => setMsg((e) => e + emoji)}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="hstack w-100 justify-content-evenly p-3">
          <Button
            onClick={() => {
              setFileShareVisible(false);
              setEmojiVisible((e) => !e);
            }}
            className="rounded-circle p-2 bg-transparent d-flex align-items-center justify-content-center border-0"
          >
            <FontAwesomeIcon icon={faSmile} size="2x" color="#56f" />
          </Button>


          {terminalcxt.isVisible ? (
            <Terminal prompt="$chat>"/>
            ):(
            <InputElement {...{ msg, setMsg, handleMsgInput }} />
            
          )}
          
          
          
          
          
          <Button
            className="rounded-circle p-2 bg-transparent d-flex align-items-center justify-content-center border-0"
            onClick={() => {
              setEmojiVisible(false);
              setFileShareVisible((e) => !e);
            }}
          >
            <FontAwesomeIcon icon={faPaperclip} size="2x" color="#56f" />
          </Button>
          <Button
            type="submit"
            className="rounded-circle p-2 bg-transparent d-flex align-items-center justify-content-center border-0"
            style={{ width: "4em", height: "4em" }}
          >
            <FontAwesomeIcon icon={faPaperPlane} size="2x" color={"#f56"} />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default InputType;
