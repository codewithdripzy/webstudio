import fs from "fs";
import path from "path";
import * as t from "@babel/types";
import * as parser from "@babel/parser";
import _traverse, { NodePath } from "@babel/traverse";
import _generate from "@babel/generator";
import { iDropType, InjectOptions, WebstudioConfig } from "./wstypes";

const generate = (_generate as any).default || _generate;
const traverse = (_traverse as any).default || _traverse;

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
    targetType, // array of selectors
}: InjectOptions): void {
    const code = fs.readFileSync(filePath, "utf-8");

    // Parse TSX to AST
    const ast = parser.parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    });

    // Convert JSX string into AST node
    const jsxAst = parser.parseExpression(jsxCode, {
        plugins: ["jsx", "typescript"],
    }) as t.JSXElement;

    let injected = false;

    console.log("Target Type:", targetType);
    
    traverse(ast, {
        JSXElement(path: {
            node: {
                openingElement: any;
                children: (
                    | t.JSXText
                    | t.JSXExpressionContainer
                    | t.JSXSpreadChild
                    | t.JSXElement
                    | t.JSXFragment
                )[];
            };
            stop: () => void;
        }) {
            const opening = path.node.openingElement;
            const name = opening.name;

            // Loop over all targetType selectors
            if (
                t.isJSXIdentifier(name) &&
                name.name === targetType.tag &&
                (!targetType.id ||
                    opening.attributes.some(
                        (attr: t.Node | null | undefined) =>
                            t.isJSXAttribute(attr) &&
                            t.isJSXIdentifier(attr.name, { name: "id" }) &&
                            t.isStringLiteral(attr.value, {
                                value: targetType.id!,
                            })
                    )) &&
                (!targetType.classes ||
                    targetType.classes.every((cls) =>
                        opening.attributes.some(
                            (attr: t.Node | null | undefined) =>
                                t.isJSXAttribute(attr) &&
                                t.isJSXIdentifier(attr.name, {
                                    name: "className",
                                }) &&
                                t.isStringLiteral(attr.value) &&
                                attr.value.value.split(/\s+/).includes(cls)
                        )
                    ))
            ) {
                path.node.children.push(t.jsxText("\n"), jsxAst);
                injected = true;
                path.stop();
            }
        },
    });

    if (!injected) {
        console.warn(
            `⚠️ Could not find any matching element to inject into in ${filePath}.`
        );
        return;
    }

    const output = generate(ast, {}, code);
    fs.writeFileSync(filePath, output.code, "utf-8");
    console.log(`✅ Injected JSX into target in ${filePath}`);
}

function generateComponentCode(data: iDropType): string {
    switch (data.data.type) {
        case "text":
            return `<p>${data.data.properties.placeholder}</p>`;
        case "image":
            return `<img src="${data.data.properties.src}" alt="${data.data.properties.alt || ""}" />`;
        case "button":
            return `<button>${data.data.properties.label}</button>`;
        case "link":
            return `<a href="${data.data.properties.href}"${data.data.properties.target ? ` target="${data.data.properties.target}"` : ""}>${data.data.properties.label}</a>`;
        // case "form":
        //     return `<form>${data.data.fields
        //         .map(
        //             (field: { type: string; name: string; label: string }) => {
        //                 return `<label>${field.label}<input type="${field.type}" name="${field.name}" /></label>`;
        //             }
        //         )
        //         .join("")}</form>`;
        // case "custom":
        //     return `<${data.data.componentName} ${Object.entries(data.data.props)
        //         .map(
        //             ([key, value]) => `${key}="${value}"`
        //         )
        //         .join(" ")}></${data.data.componentName}>`;
        default:
            console.warn(
                `⚠️ Unsupported component type: ${data.data.type}. Returning empty string.`
            );
            return "";
        }
}

export { isValidWebstudioConfig, generateComponentCode };
