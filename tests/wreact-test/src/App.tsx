import './styles/App.css';
import { useRef } from 'react';
import { Webstudio } from "@webstudio/react";
function App() {
  // You can add any additional logic or state management here if needed
  const app = useRef<HTMLDivElement>(null);
  return <div className='app' id="ws-app" ref={app}>
    <Webstudio rootRef={app} />
  
    <p>undefined</p></div>;
}
export default App;