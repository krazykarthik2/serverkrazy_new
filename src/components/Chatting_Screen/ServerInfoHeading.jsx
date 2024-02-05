import React from "react";
import { Stack } from "react-bootstrap";
import { Back } from "../utils/Navigations";

export function ServerInfoHeading({ firebase, server, className }) {
  return (
    <div className={className}>
      <Stack direction="horizontal" className="justify-content-between">
        <Back />
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <img
            src={"https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=" +
              server.serverName}
            className="rounded" />
          <h1>{server.serverName}</h1>
          <img
            src={firebase?.currentUser?.photoURL || ""}
            className="rounded" />
        </Stack>
      </Stack>
    </div>
  );
}
