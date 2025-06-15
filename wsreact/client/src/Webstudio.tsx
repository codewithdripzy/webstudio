import { useEffect } from 'react';
import { io } from 'socket.io-client';
import ToolbarButton from './components/toolbar';
import { sendDrop, getElementPath } from './core/functions';

// connect to the server
const conn = io("ws://localhost:3250", {
  transports: ['websocket', 'polling'],
});

function Webstudio({
  rootRef
} : {
  rootRef: React.RefObject<HTMLDivElement | null>
}) {
  
  // listen for drop events on the root element
  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      // get drop coordinates
      const x = event.clientX;
      const y = event.clientY;

      // get the target element the drop is happening on with  the parents element like "div>section>article"
      const targetElement = getElementPath(event);
      console.log('Target element path:', targetElement.join(' > '));
      
      // Get the data being dropped
      const data = event.dataTransfer?.getData('application/json');
      if (data) {
        try {
          const route = window.location.pathname;
          const parsedData = JSON.parse(data);
          console.log('Data dropped:', parsedData);

          sendDrop({
            conn,
            route,
            data: parsedData,
            targetElement,
            coordinates: { x, y }
          });
        } catch (error) {
          console.error('Error parsing dropped data:', error);
        }
      }
    };

    rootElement.addEventListener('drop', handleDrop);

    rootElement.addEventListener('dragover', (event) => {
      event.preventDefault(); // Prevent default to allow drop

      // Show the wbstudio dropper
      const dropper = rootElement.querySelector('.webstudio-dropper');
      if (dropper) {
        dropper.classList.add('drag-over');
      }
    });

    rootElement.addEventListener('dragleave', (event) => {
      event.preventDefault(); // Prevent default to allow drop
      rootElement.classList.remove('drag-over');
      const dropper = rootElement.querySelector('.webstudio-dropper');
      if (dropper) {
        dropper.classList.remove('drag-over');
      }
    });

    rootElement.addEventListener('dragend', (event) => {
      event.preventDefault(); // Prevent default to allow drop
      const dropper = rootElement.querySelector('.webstudio-dropper');
      if (dropper) {
        dropper.classList.remove('drag-over');
      }
    });

    return () => {
      rootElement.removeEventListener('drop', handleDrop);
      rootElement.removeEventListener('dragover', (event) => event.preventDefault());
    };
  }, [rootRef]);

  return <div ref={rootRef}>
    <div className="webstudio-dropper"></div>
    <ToolbarButton />
  </div>
}
  
export default Webstudio;
