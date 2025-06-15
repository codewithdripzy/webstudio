import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io";
import { iDropData } from "./interfaces";

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

function getElementPath(event: DragEvent): string[] {
    const path: string[] = [];
    let el = event.target as HTMLElement | null;

    while (el && el.nodeType === Node.ELEMENT_NODE) {
        const tag = el.tagName.toLowerCase();
        let selector = tag;

        // Add ID
        if (el.id) selector += `#${el.id}`;

        // Add class names
        if (el.classList.length) {
        selector += '.' + Array.from(el.classList).join('.');
        }

        path.unshift(selector);
        el = el.parentElement;
    }

    return path;
}

export { sendDrop, getElementPath };