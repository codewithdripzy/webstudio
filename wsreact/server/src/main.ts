import fs from 'fs';
import cors from 'cors';
import path from 'path';
import { Server } from 'http';
import { Server as SocketIOServer } from "socket.io";
import express, { Request, Response } from 'express';

const app = express();
const server = new Server(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

// get the cwd of where the package was installed
const projectPath = path.join(process.cwd());
const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf-8'));

console.log(`🚀 Starting server for ${packageJson.name} v${packageJson.version}...`);
console.log(`📦 Package name: ${packageJson.name}`);
console.log(`📂 Project path: ${projectPath}`);
console.log(`📂 Current working directory: ${process.cwd()}`);

app.get('/ping', (req: Request, res: Response) => {
  res.send({ message: 'pong' });
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });

  socket.on('message', (message) => {
    console.log('Message received:', message);
    socket.emit('message', `Server received: ${message}`);
  });

  socket.on('edit', (data) => {
    // console.log('Edit event received:', data);
    // const filePath = path.join(projectPath, 'src-to-edit', 'App.jsx');
    // let code = fs.readFileSync(filePath, 'utf-8');
    // code = code.replace('</div>', `  <button>${data.props.text}</button>\n</div>`);
    // fs.writeFileSync(filePath, code);
    // console.log('File modified:', filePath);
    // socket.emit('edit', { message: 'Code modified!' });
  });
});

// Serve static files from the client directory
// app.use('/client', express.static(path.join(__dirname, '../client/dist')));
const port = process.env.PORT || 3250;

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});