import './styles/App.css'
import { useRef } from 'react';
import { Webstudio } from "@webstudio/react";

function App() {
  // You can add any additional logic or state management here if needed
  const app = useRef<HTMLDivElement>(null);

  return (
    <div ref={app}>
      <Webstudio rootRef={app} />
    </div>
  )
}

export default App
