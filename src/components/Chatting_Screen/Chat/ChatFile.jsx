import React, { Suspense } from "react";
import { Await, useAsyncValue } from "react-router-dom";
import Loading from "../../utils/Loading";
import { AudioFile, ImageFile, OtherFile, VideoFile } from "../Chat/Files";
import { useMemo } from "react";
export function ChatFileAfterLoad({ msg, index, _fileDelete, fileLink }) {
  return (
    <>
      {msg.fileType.includes("image") && (
        <ImageFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={fileLink}
        />
      )}
      {msg.fileType.includes("audio") && (
        <AudioFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={fileLink}
        />
      )}
      {msg.fileType.includes("video") && (
        <VideoFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={fileLink}
        />
      )}
      {["image", "audio", "video"].findIndex((x) => msg.fileType.includes(x)) !=
        -1 || (
        <OtherFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={fileLink}
        />
      )}
    </>
  );
}

function ChatFile({ msg, index, _fileDelete, downloadURL }) {
  return (
    <ChatFileAfterLoad
      msg={msg}
      index={index}  
      _fileDelete={_fileDelete}
      fileLink={downloadURL}
    />
  );
}
export default ChatFile;
