import fs from "fs";
import path from "path";
import * as t from "@babel/types";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as parser from "@babel/parser";

import { iDropType, InjectOptions, WebstudioConfig } from "./wstypes";

function isValidWebstudioConfig(config: WebstudioConfig): boolean {
    // Perform validation checks on the config object
    if (!config.routes || typeof config.routes !== "object") {
        console.error(
            '❌ Invalid webstudio.config.json: "routes" is required and must be an object.'
        );
        return false;
    }

    for (const [route, data] of Object.entries(config.routes)) {
        if (!data.component || typeof data.component !== "string") {
            console.error(
                `❌ Invalid webstudio.config.json: "component" is required for route "${route}".`
            );
            return false;
        }
    }

    return true;
}
export function injectJSXAtTarget({
    filePath,
    jsxCode,
    targetType,
}: InjectOptions): void {
    const code = fs.readFileSync(filePath, "utf-8");

    // Parse to AST with TS + JSX
    const ast = parser.parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    });

    // Convert JSX string into an AST node
    const jsxAst = parser.parseExpression(jsxCode, {
        plugins: ["jsx"],
    }) as t.JSXElement;

    let injected = false;

    traverse(ast, {
        JSXElement(path) {
            const opening = path.node.openingElement.name;

            // Match opening tag with target type
            // if (
            //     t.isJSXIdentifier(opening) &&
            //     opening.name.toLowerCase() === targetType.toLowerCase()
            // ) {
            //     // Push with a line break to make it clean
            //     path.node.children.push(t.jsxText("\n"), jsxAst);
            //     injected = true;
            //     path.stop();
            // }
        },
    });

    if (!injected) {
        console.warn(
            `⚠️ Could not find a <${targetType}> tag to inject into in ${filePath}.`
        );
        return;
    }

    const output = generate(ast, {}, code);
    fs.writeFileSync(filePath, output.code, "utf-8");
    console.log(`✅ Injected JSX into <${targetType}> in ${filePath}`);
}

function generateComponentCode(data: iDropType): string {
    // This function generates the JSX code for the component based on the dropped data
    // For simplicity, we assume data has a type and properties
    return `<></>`;
    //   return `<${data.type} ${Object.entries(data.properties).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
}

export { isValidWebstudioConfig, generateComponentCode };
