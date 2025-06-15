import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

interface iDropData {
    route: string;
    conn: Socket<DefaultEventsMap, DefaultEventsMap>;
    data: object;
    coordinates: { x: number; y: number; };
    targetElement: string[];
}

export type { iDropData };