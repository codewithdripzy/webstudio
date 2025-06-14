"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// get the cwd of where the package was installed
const projectPath = path_1.default.join('../', '../');
// const packageJson = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json'), 'utf-8'));
// console.log(`🚀 Starting server for ${packageJson.name} v${packageJson.version}...`);
// console.log(`📦 Package name: ${packageJson.name}`);
console.log(`📂 Project path: ${projectPath}`);
console.log(`📂 Current working directory: ${process.cwd()}`);
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
app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
