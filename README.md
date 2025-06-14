# 📘 Webstudio Documentation

## Overview

**Webstudio** is a **visual programming library** that enables dynamic modification of a user's codebase based on their interactions with a web-based visual editor. It allows users to **drag, drop, connect, and modify programmatic components** while automatically syncing those changes to the underlying code.

---

## ✨ Key Features

* 🔧 **Visual-to-Code Mapping:** Translate visual actions into real code changes in real-time.
* 🧠 **Intelligent Code Updates:** Seamlessly inject, remove, or alter code based on user actions.
* 🪄 **Framework-Agnostic:** Works with any JavaScript or web framework.
* ♻️ **Two-Way Sync:** Changes in the visual interface and source code stay in sync.
* 🧩 **Plugin-Friendly:** Easily extendable via plugins for new block types, code templates, or logic.

---

## 📦 Installation

Install Webstudio using npm:

```bash
npm install webstudio
```

or via yarn:

```bash
yarn add webstudio
```

---

## 🚀 Getting Started

### 1. Initialize Webstudio in Your App

```js
import Webstudio from 'webstudio';

const studio = new Webstudio({
  rootElement: document.getElementById('studio'),
  codebasePath: '/src',
});
studio.init();
```

### 2. Define Components

Create visual blocks that map to specific code actions.

```js
studio.registerBlock({
  name: 'Button',
  html: '<button>Click Me</button>',
  code: `const handleClick = () => console.log('Button Clicked');`,
  insertPosition: 'body:end'
});
```

### 3. Listen for Changes

Webstudio can react to visual edits and apply those to the codebase:

```js
studio.on('change', (change) => {
  console.log('Code updated with:', change);
});
```

---

## ⚙️ Configuration Options

| Option         | Type     | Description                                                  |
| -------------- | -------- | ------------------------------------------------------------ |
| `rootElement`  | Element  | DOM element where the visual editor renders                  |
| `codebasePath` | String   | Relative path to the source code files                       |
| `autoSync`     | Boolean  | Enable/disable auto writing changes to the file system       |
| `saveHandler`  | Function | Custom function to save updated code (if not using autoSync) |

---

## 📚 API Reference

### `registerBlock({ name, html, code, insertPosition })`

Registers a new visual block that maps to code.

* `name`: Unique identifier
* `html`: HTML shown in visual editor
* `code`: Corresponding code snippet
* `insertPosition`: e.g., `'body:end'`, `'head:start'`, or a custom selector

---

### `on(eventName, callback)`

Listens to events like `change`, `blockAdd`, `blockRemove`.

---

### `init()`

Bootstraps the Webstudio editor and loads existing code.

---

### `getCode()`

Returns the current codebase state as a string.

---

### `exportProject()`

Exports current visual structure and codebase into a downloadable ZIP.

---

## 🧱 Supported Actions

* Add / Remove HTML components
* Inject CSS rules
* Define and link JavaScript logic
* Modify props and attributes visually
* Define event listeners visually
* Generate routing or dynamic imports (with plugins)

---

## 🔌 Plugin System

You can extend Webstudio through a simple plugin system.

```js
studio.use(myPlugin);
```

Plugins must follow this structure:

```js
export default function myPlugin(studio) {
  studio.registerBlock({ ... });
  studio.on('blockAdd', block => { ... });
}
```

---

## 🧪 Testing and Debugging

Use built-in logging:

```js
studio.enableDebug(true);
```

Or hook into lifecycle events:

```js
studio.on('init', () => console.log('Editor initialized'));
```

---

## 🧑‍💻 Contributing

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/webstudio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

---

## 📄 License

MIT License © 2025 \[Your Name or Company]

---

## 🔮 Roadmap

* [ ] Code diffing for smarter file edits
* [ ] AI-assisted code generation in blocks
* [ ] Git integration
* [ ] Drag-and-drop UI templates
* [ ] Collaborative editing (real-time)
