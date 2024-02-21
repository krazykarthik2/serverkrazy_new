function _do(...args) {
  let x = "I do not how to do that";
  console.log("user told to do: " + args.join(" "));
  if (args.join(" ") == "nothing") return "yeah.";
  try {
    x = eval(args.join(" "));
  } catch (e) {
    console.log(e);
  }
  return x;
}
const smallCommands = {
  impossible: () => {
    return "Nothing is impossible!";
  },
  do: _do,
  exec: _do,
};
export default smallCommands;
