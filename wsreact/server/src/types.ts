interface iDropType {
    route: string;
    data: {
        type: string,
        properties: { 
            placeholder: string,
            value: string,
            width: number,
            height: number
        }
    },
    coordinates: { x: number, y: number }
    targetElement: string[];
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

interface InjectOptions {
    filePath: string;
    jsxCode: string;
    targetType: string[];
}

export type { iDropType, CollaborationConfig, RouteConfig, ComponentConfig, WebstudioConfig, InjectOptions };