import { server } from "../../../frontend";

function shareServer() {
  
  return navigator.share({
    title: "Jump in to " + server.getLink(),
    text: server.getLink(),
    url: server.getLink(),
  });
}
function shareThis(){
  return navigator.share({
    title: "Serverkrazy",
    text: "Check out Serverkrazy on https://serverkrazy.web.app",
    url: "https://serverkrazy.web.app",
  })
}
export { shareServer ,shareThis};
