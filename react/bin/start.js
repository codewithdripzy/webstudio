#!/usr/bin/env node

const { spawnSync, spawn } = require("child_process");
const path = require("path");

// 1) sync-build
spawnSync("pnpm", ["run", "build:server"], { stdio: "inherit", shell: true });

// 2) run the compiled server
const serverPath = path.join(__dirname, "../server/main.js");
const server = spawn("node", [serverPath], { stdio: "inherit", shell: true });
server.on("close", code => console.log(`Server exited with code ${code}`));
