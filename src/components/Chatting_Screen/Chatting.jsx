import React, { useEffect } from "react";
import { Chat } from "./Chat/Chat";
import ChatFile from "./Chat/ChatFile";
import { FileIsUploading } from "./Chat/Files";
import DeletedMessage from "./DeletedMessage";
import Location from "./Chat/Location/Location";
import { server } from "../../frontend";
import user_svg from "../../assets/user.svg";
export function Chatting({
  msgBucket,
  className,
  _delete,
  _fileDelete,
  downloadURL,
}) {
  const [downloadURLmap, setDownloadURLmap] = React.useState({});
  window.downloadURLmap = downloadURLmap;

  const [pfpMap, setPfpMap] = React.useState({});
  window.pfpMap = pfpMap;

  useEffect(() => {
    let normalURLs = msgBucket.filter((e) => e.filePath).map((e) => e.filePath);
    let normURLsinMap = Object.keys(downloadURLmap);
    console.log("bucket triggered");
    normalURLs.forEach((key) => {
      if (normURLsinMap.findIndex((e) => e == key) != -1) {
        return;
      } else {
        console.log("getting new url");
        downloadURL(key).then((res) => {
          setDownloadURLmap((prev) => {
            return { ...prev, [key]: res };
          });
        });
      }
    });

    let pfps = msgBucket
      .filter((e) => server.isPfpStoredinFb(e.senderPhoto))
      .map((e) => e.senderPhoto);

    let pfpsinMap = Object.keys(pfpMap);
    pfps.forEach((key) => {
      if (pfpsinMap.findIndex((e) => e == key) != -1) {
        return;
      } else {
        console.log("getting new pfp url");
        downloadURL(key).then((res) => {
          setPfpMap((prev) => {
            return { ...prev, [key]: res };
          });
        });
      }
    });
  }, [msgBucket]);

  return (
    <div className={className}>
      {msgBucket.map((msg, index) => (
        <>
          {msg == null && <DeletedMessage key={msg?.key} />}

          {msg?.title == "file" &&
            (msg?.filePath ? (
              <ChatFile
                msg={msg}
                index={index}
                _fileDelete={() => _fileDelete(msg.filePath, msg.key)}
                downloadURL={downloadURLmap[msg.filePath]}
                pfp={pfpMap[msg.senderPhoto] || msg.senderPhoto || user_svg}
                key={msg.key}
              />
            ) : (
              <FileIsUploading
                msg={msg}
                index={index}
                key={msg.key}
                pfp={pfpMap[msg.senderPhoto] || msg.senderPhoto || user_svg}
              />
            ))}
          {msg?.title == "message" && (
            <Chat
              msg={msg}
              index={index}
              _delete={() => _delete(msg.key)}
              pfp={pfpMap[msg.senderPhoto] || msg.senderPhoto || user_svg}
              key={msg.key}
            />
          )}
          {msg.title == "loc" && (
            <Location
              msg={msg}
              index={index}
              _delete={() => _delete(msg.key)}
              key={msg.key}
              pfp={pfpMap[msg.senderPhoto] || msg.senderPhoto || user_svg}
            />
          )}
        </>
      ))}
    </div>
  );
}
