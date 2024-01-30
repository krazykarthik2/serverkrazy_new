import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Back } from "./utils/Navigations";
import { firebaseContext, serverContext, msgBucketContext } from "./App";
function ServerInfoHeading({ firebase, server }) {
  return (
    <>
      <Stack direction="horizontal" className="justify-content-between">
        <Back />
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <img
            src={
              "https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=" +
              server.serverName
            }
            className="rounded"
          />
          <h1>{server.serverName}</h1>
          <img src={firebase.currentUser.photoURL || ""} className="rounded" />
        </Stack>
      </Stack>
    </>
  );
}
function Chat({ msg, index }) {
  console.log(msg);
  console.log("is the message");
  return (
    <div className="w-100 h-100">
      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-evenly w-100"
      >
        <p>{msg.data.sender}</p>
        <p>{msg.data.message}</p>
      </Stack>
    </div>
  );
}
function Chatting({ msgBucket }) {
  console.log(msgBucket);
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    setMsgs(msgBucket);
    console.log("triggered change in bucket in chatting");
  }, [msgBucket]);

  return (
    <div className="w-100 h-100">
      {msgs.map((msg, index) => (
        <Chat {...{ msg, index }} />
      ))}
    </div>
  );
}
function InputType({ server }) {
  const [msg, setMsg] = useState("");
  function handleMsgInput(e) {
    e.preventDefault();
    if (!msg) return;
    server.sendMessage(msg);
    setMsg("");
  }
  return (
    <div className="w-100 h-100">
      <Form onSubmit={handleMsgInput}>
        <Form.Group className="mb-3" controlId="ControlInput1">
          <Form.Label>Enter Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Message"
            autoFocus
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="rounded-circle">
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </Button>
      </Form>
    </div>
  );
}
function Len({ e }) {
  return <div>{e.length}</div>;
}
function ServerChat(
  // { firebase, server, msgBucket }
  ) {
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const msgBucket = useContext(msgBucketContext);

  const [__fb, setFb] = useState(firebase);
  const [__server, setServer] = useState(server);
  const [__msgBucket, setMsgBucket] = useState(msgBucket);
  useMemo(() => {
    window.serverChat = { __fb, __server, __msgBucket };
  });
 

  useEffect(() => {
    setFb(firebase);
  }, [firebase]);

  useEffect(() => {
    setServer(server);
  }, [server]);

  useEffect(() => {
    window.alert(msgBucket.length==0?"":msgBucket[msgBucket.length - 1].data.message);
    setMsgBucket(msgBucket);
  }, [msgBucket]);

  return (
    <div className="w-100 h-100">
      
      <Len e={__msgBucket} />
      <Len e={msgBucket} />
      <ServerInfoHeading firebase={__fb} server={__server} />
      <Chatting msgBucket={__msgBucket} />
      <InputType server={__server} />
    </div>
  );
}

export default ServerChat;
