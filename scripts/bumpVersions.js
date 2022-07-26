const fs = require("fs");
const path = require("path");
const app = require("../app.json");
const package = require("../package.json");

const [major, minor, patch] = app.expo.version.split(".");
const nextVersion = [major, minor, parseInt(patch) + 1].join(".");

const appNext = { ...app };
const packageNext = { ...package };

appNext.expo.version = nextVersion;
appNext.expo.ios.buildNumber = nextVersion;
appNext.expo.android.versionCode += 1;

packageNext.version = nextVersion;

fs.writeFileSync(
  path.resolve("./app.json"),
  JSON.stringify(appNext, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.resolve("./package.json"),
  JSON.stringify(packageNext, null, 2),
  "utf-8"
);
