import cors from 'cors';
import path from 'path';
import express from 'express';
const app = express();
app.use(cors());
app.use(express.json());
// get the cwd of where the package was installed
const projectPath = path.join('../', '../');
// const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf-8'));
// console.log(`🚀 Starting server for ${packageJson.name} v${packageJson.version}...`);
// console.log(`📦 Package name: ${packageJson.name}`);
console.log(`📂 Project path: ${projectPath}`);
console.log(`📂 Current working directory: ${process.cwd()}`);
app.get('/ping', (req, res) => {
    res.send({ message: 'pong' });
});
app.get('/edit', (req, res) => { });
app.post('/add/:component', (req, res) => {
});
// app.post('/modify', (req: Request, res: Response) => {
//   const filePath = path.join(__dirname, '../src-to-edit/App.jsx');
//   const body = req.body as { component: string; props: { text: string } };
//   let code = fs.readFileSync(filePath, 'utf-8');
//   code = code.replace('</div>', `  <button>${body.props.text}</button>\n</div>`);
//   fs.writeFileSync(filePath, code);
//   res.send({ message: 'Code modified!' });
// });
const port = process.env.PORT || 3250;
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
