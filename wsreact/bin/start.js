#!/usr/bin/env node

import path from "path";
import { spawnSync, spawn } from "child_process";
import { fileURLToPath } from "url";

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Build the server in _this package_ (regardless of where the CLI is invoked from)
const pkgRoot = path.join(__dirname, "..");
const buildResult = spawnSync(
  "npm",
  ["run", "build:server"],
  { stdio: "inherit", shell: true, cwd: pkgRoot }
);

if (buildResult.status !== 0) {
  console.error("🚨 Server build failed - aborting.");
  process.exit(buildResult.status);
}

// 2) Launch the compiled server
const serverEntry = path.join(pkgRoot, "server/dist/main.js");
const server = spawn("node", [serverEntry], {
  stdio: "inherit",
  shell: true,
});

server.on("data", (data) => {
  console.log(`[server stdout]: ${data}`);
});

server.on("error", (err) => {
  console.error("🚨 Server failed to start:", err);
  process.exit(1);
});

setTimeout(() => {
  server.unref(); // Detach from the parent process
}, 3000)

server.on("close", (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});
