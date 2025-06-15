// import '../../server/dist/main';
import './styles/global.css';
import App from './Webstudio'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(<App />)

export { default as Webstudio } from './Webstudio';