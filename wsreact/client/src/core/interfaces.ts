import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

interface iDropData {
    route: string;
    conn: Socket<DefaultEventsMap, DefaultEventsMap>;
    data: iDropItemData;
    coordinates: { x: number; y: number; };
    targetElement: ElementSelector;
}

interface iDropItemData {
    type: string,
    properties: {
        direction: "row" | "column",
        justify: "flex-start" | "flex-end" | "center" | "space-between" | "space-around",
        align: "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
        src?: string,
        alt?: string,
        placeholder?: string,
        text?: string,
        href?: string,
        target?: string,
        label?: string,
        id?: string,
        className?: string,
        name?: string,
        type?: string,
        style?: Record<string, string>,
        srcSet?: string,
        sizes?: string,
        value: string,
        width: number,
        height: number
    }
}
interface ElementSelector {
  tag: string;
  id?: string;
  classes?: string[];
}

export type { iDropData, ElementSelector };