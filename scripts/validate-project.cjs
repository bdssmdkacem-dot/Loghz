const fs = require("node:fs");
const path = require("node:path");
const errors = [];
const check = (ok, message) => { if (!ok) errors.push(message); };
const read = (name) => fs.readFileSync(path.join(process.cwd(), name), "utf8");

const app = JSON.parse(read("app.json")).expo;
for (const asset of [app.icon, app.splash && app.splash.image, app.android && app.android.adaptiveIcon && app.android.adaptiveIcon.foregroundImage].filter(Boolean)) {
  check(fs.existsSync(path.join(process.cwd(), asset)), "Missing configured asset: " + asset);
}

const lines = read("src/data/riddles.js").split(/\r?\n/).filter(line => /^\s*\{\s*id:/.test(line));
check(lines.length >= 20, "Expected 20 or more riddles; found " + lines.length);
const ids = new Set();
const media = new Set();
for (const line of lines) {
  const id = line.match(/id:"([^"]+)"/)?.[1];
  const type = line.match(/type:"([^"]+)"/)?.[1];
  const block = line.match(/choices:\[([^\]]+)\]/)?.[1];
  const answer = line.match(/answer:"([^"]+)"/)?.[1];
  const difficulty = line.match(/difficulty:"([^"]+)"/)?.[1];
  check(Boolean(id && type && block && answer && difficulty), "Malformed riddle: " + line.slice(0, 60));
  if (!id || !block || !answer || !difficulty) continue;
  check(!ids.has(id), "Duplicate riddle id: " + id);
  ids.add(id);
  const choices = [...block.matchAll(/"([^"]+)"/g)].map(match => match[1]);
  check(choices.length >= 2 && choices.includes(answer), id + " has invalid choices or answer");
  check(["easy", "medium", "hard"].includes(difficulty), id + " has invalid difficulty");
  if (type === "image") {
    const key = line.match(/media:"([^"]+)"/)?.[1];
    check(Boolean(key), id + " is missing animal media");
    if (key) media.add(key);
  }
}
const r12 = lines.find(line => /id:"r12"/.test(line)) || "";
check(r12.includes("القرن") && r12.includes("الدقيقة") && r12.includes("الساعة") && r12.includes('answer:"حرف القاف"'), "r12 letter-count riddle must use the correct words and answer");
const game = read("src/screens/GameScreen.js");
for (const key of media) check(game.includes(JSON.stringify(key) + ":"), "Missing animal illustration mapping: " + key);
check(game.includes("choiceCorrectText") && game.includes("choiceWrongText"), "Answer result text contrast styles are missing");
check(game.includes("الصوت غير متوفر حالياً"), "Missing audio must be disclosed in the UI");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Validation passed: " + lines.length + " riddles, unique IDs, valid answers/difficulties, mapped animals and Expo asset references.");
