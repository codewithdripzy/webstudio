import { useEffect } from 'react';
import ToolbarButton from './components/toolbar';

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
      console.log("Dropped...");
      
      // console.log('File dropped:', event.dataTransfer?.files);
      // Handle the dropped files here
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
