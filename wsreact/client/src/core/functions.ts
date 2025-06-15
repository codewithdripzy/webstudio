import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { ElementSelector, iDropData } from "./interfaces";

function sendDrop({
    route,
    conn,
    data,
    coordinates,
    targetElement
}: iDropData){
    // Send the drop event to the server or handle it as needed
    conn.emit("drop", {
        route,
        data,
        coordinates,
        targetElement
    });
}

function getElementPath(event: DragEvent): ElementSelector {
  const el = event.target as HTMLElement;

  const selector: ElementSelector = {
    tag: el.tagName.toLowerCase(),
  };

  if (el.id) {
    selector.id = el.id;
  }

  const classList = Array.from(el.classList).filter(cls => {
    // Optional: whitelist only known, static classes if needed
    return !cls.startsWith("drag-") && !cls.startsWith("webstudio-");
  });

  if (classList.length) {
    selector.classes = classList;
  }

  return selector;
}

export { sendDrop, getElementPath };