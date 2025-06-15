import fs from "fs";
import cors from "cors";
import path from "path";
import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import express from "express";
import { generateComponentCode, injectJSXAtTarget, isValidWebstudioConfig } from "./wsfunctions.js";
const app = express();
const server = new Server(app);
const io = new SocketIOServer(server, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific methods
}));
app.use(express.json());
// Get the cwd of where the package was installed
const projectPath = path.join(process.cwd());
const webstudioConfigPath = path.join(projectPath, "webstudio.config.json");
const webstudioConfig = JSON.parse(fs.readFileSync(webstudioConfigPath, "utf-8"));
const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, "package.json"), "utf-8"));
if (!webstudioConfig) {
    console.error("\u274C webstudio.config.json not found in the project root.");
    process.exit(1);
}
if (!packageJson) {
    console.error("\u274C package.json not found in the project root.");
    process.exit(1);
}
// validate webstudioConfig
if (!isValidWebstudioConfig(webstudioConfig)) {
    console.error("\u274C Invalid webstudio.config.json. Please check the configuration.");
    process.exit(1);
}
// import { iDropType } from '@webstudio-is/sdk'; // Adjust the import path as necessary
console.log(`🌟 Webstudio configuration loaded from ${webstudioConfigPath}`);
console.log(`🚀 Starting server for ${packageJson.name} v${packageJson.version}...`);
console.log(`📦 Package name: ${packageJson.name}`);
console.log(`📂 Project path: ${projectPath}`);
console.log(`📂 Current working directory: ${process.cwd()}`);
app.get("/ping", (req, res) => {
    res.send({ message: "pong" });
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
    socket.on("message", (message) => {
        console.log("Message received:", message);
        socket.emit("message", `Server received: ${message}`);
    });
    socket.on("drop", (data) => {
        var _a;
        const parsedData = data;
        const routeFile = (_a = webstudioConfig.routes[parsedData.route]) === null || _a === void 0 ? void 0 : _a.component;
        if (!routeFile) {
            console.error(`❌ No mapped component for route: ${parsedData.route}`);
            // send an error response back to the client
            socket.emit("error", { message: `No mapped component for route: ${parsedData.route}` });
            return;
        }
        const absolutePath = path.join(projectPath, routeFile);
        try {
            const parsedContent = injectJSXAtTarget({
                filePath: absolutePath,
                jsxCode: generateComponentCode(parsedData),
                targetType: parsedData.targetElement
            });
            // Here you would typically parse the currentContent to find where to inject the new component
            // assuming currentContent has some kind of JSX/TSX structure
            // Here you would generate the JSX code for the component based on the dropped data
            // For example, if parsedData.data.type is a React component type, we will create a new component
            // This is a placeholder for the actual JSX generation logic
            // const jsx = `<${parsedData.data.type} ${Object.entries(parsedData.data.properties).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
            // For now, we will just log the generated JSX
            // const jsx = generateComponentCode(parsedData.data);
            // const updated = currentContent.replace(
            //   /<main[^>]*>([\s\S]*?)<\/main>/,
            //   (match, inner) => `<main>${inner}\n  ${jsx}</main>`
            // );
            // fs.writeFileSync(absolutePath, updated, 'utf-8');
            console.log(`✅ Injected ${parsedData.data.type} into ${routeFile}`);
        }
        catch (err) {
            console.error(`🚫 Failed to update ${routeFile}:`, err);
        }
    });
    socket.on("edit", (data) => {
        // Placeholder for edit operation
    });
});
// 🔥 Fix: Listen on `server`, not `app`
const port = process.env.PORT || 3250;
server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
