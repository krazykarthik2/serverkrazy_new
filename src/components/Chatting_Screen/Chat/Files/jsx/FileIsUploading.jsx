import React from "react";
import { Stack } from "react-bootstrap";

function FileIsUploading({ msg, index ,pfp}) {
  return (
    <div className="w-100 h-100">
      <div className="hstack">
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-evenly w-100"
        >
          <p>{msg.bytesTransferred}</p> / <p>{msg.totalBytes}</p>
        </Stack>
        
      </div>
    </div>
  );
}
export default FileIsUploading; 
 