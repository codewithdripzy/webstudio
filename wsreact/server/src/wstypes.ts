interface iDropType {
    route: string;
    data: {
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
    },
    coordinates: { x: number, y: number }
    targetElement: ElementSelector;
}

interface CollaborationConfig {
    enabled: boolean;
    url: string;
    projectId: string;
    branch: string;
    accessToken: string;
}

interface RouteConfig {
    component: string;
    exact?: boolean;
}

interface ComponentConfig {
    path: string;
    props?: Record<string, any>;
}

interface WebstudioConfig {
    collaboration: CollaborationConfig;
    root: string;
    outDir: string;
    include: string[];
    exclude: string[];
    routes: Record<string, RouteConfig>;
    components: Record<string, ComponentConfig>;
    assets: {
        styles: string[];
    };
}

interface ElementSelector {
    tag: string;
    id?: string;
    classes?: string[];
}

interface InjectOptions {
    filePath: string;
    jsxCode: string;
    targetType: ElementSelector;
}

export type { iDropType, CollaborationConfig, RouteConfig, ComponentConfig, WebstudioConfig, ElementSelector, InjectOptions };