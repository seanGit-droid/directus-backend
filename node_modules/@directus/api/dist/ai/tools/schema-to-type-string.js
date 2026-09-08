import { z as z$1 } from "zod";

//#region src/ai/tools/schema-to-type-string.ts
const toolTypeStringCache = /* @__PURE__ */ new WeakMap();
function getToolTypeStrings(tool) {
	const cached = toolTypeStringCache.get(tool);
	if (cached) return cached;
	const types = { inputType: schemaToTypeString(z$1.toJSONSchema(tool.inputSchema, { io: "input" }), "Input") };
	if (tool.output) types.outputType = schemaToTypeString(z$1.toJSONSchema(tool.output), "Output");
	toolTypeStringCache.set(tool, types);
	return types;
}
function schemaToTypeString(schema, rootName) {
	const root = schema;
	const rootReferenced = referencesRoot(root);
	const context = createContext(root, rootName, rootReferenced);
	const rootType = rootReferenced ? renderDeclaration(root, context, rootName) : renderSchema(root, context);
	return [...renderDefs(context), rootType].join("\n\n");
}
function createContext(schema, rootName, rootDeclared) {
	const context = {
		defs: schema.$defs ?? {},
		defNames: /* @__PURE__ */ new Map(),
		rootName,
		usedNames: new Set(rootDeclared ? [rootName] : [])
	};
	for (const key of Object.keys(context.defs).sort()) context.defNames.set(key, getAvailableName(getDefinitionName(key), context.usedNames));
	return context;
}
function referencesRoot(schema) {
	if (!schema || typeof schema === "boolean") return false;
	if (schema.$ref === "#") return true;
	return [
		...Object.values(schema.$defs ?? {}),
		...schema.anyOf ?? [],
		...schema.oneOf ?? [],
		...schema.allOf ?? [],
		...Object.values(schema.properties ?? {}),
		...getSchemaEntries(schema.items),
		...schema.prefixItems ?? [],
		...typeof schema.additionalProperties === "object" ? [schema.additionalProperties] : []
	].some((child) => referencesRoot(child));
}
function getSchemaEntries(entries) {
	if (!entries) return [];
	return Array.isArray(entries) ? entries : [entries];
}
function getSchemaTypes(schema) {
	if (!schema.type) return [];
	return Array.isArray(schema.type) ? schema.type : [schema.type];
}
function renderDefs(context) {
	return Object.keys(context.defs).sort().map((key) => renderDeclaration(context.defs[key], context, context.defNames.get(key)));
}
function renderDeclaration(schema, context, name) {
	if (canRenderInterface(schema)) return `interface ${name} ${renderObject(schema, context)}`;
	return `type ${name} = ${renderSchema(schema, context)};`;
}
function renderSchema(schema, context) {
	if (schema === false) return "never";
	if (!schema || schema === true) return "unknown";
	if (schema.$ref) return renderRef(schema.$ref, context);
	if ("const" in schema) return renderLiteral(schema.const);
	if (schema.enum) return renderUnion(schema.enum.map(renderLiteral));
	if (schema.anyOf) return renderUnion(schema.anyOf.map((entry) => renderSchema(entry, context)));
	if (schema.oneOf) return renderUnion(schema.oneOf.map((entry) => renderSchema(entry, context)));
	if (schema.allOf) return schema.allOf.map((entry) => parenthesizeUnion(renderSchema(entry, context))).join(" & ");
	const types = getSchemaTypes(schema);
	if (types.length > 1) return renderUnion(types.map((type) => renderSchema({
		...schema,
		type
	}, context)));
	switch (types[0]) {
		case "object": return renderObject(schema, context);
		case "array": return renderArray(schema, context);
		case "string": return "string";
		case "number":
		case "integer": return "number";
		case "boolean": return "boolean";
		case "null": return "null";
		default: return renderUnknownSchema(schema, context);
	}
}
function canRenderInterface(schema) {
	if (!schema || typeof schema === "boolean") return false;
	if (schema.$ref || schema.anyOf || schema.oneOf || schema.allOf || "const" in schema || schema.enum) return false;
	const types = getSchemaTypes(schema);
	if (types.length > 1) return false;
	const isObjectLike = types[0] === "object" || !!schema.properties;
	const hasNamedProperties = Object.keys(schema.properties ?? {}).length > 0;
	return isObjectLike && (hasNamedProperties || schema.additionalProperties === false);
}
function renderRef(ref, context) {
	if (ref === "#") return context.rootName;
	if (ref.startsWith("#/$defs/")) {
		const key = decodeJsonPointerToken(decodeURIComponent(ref.slice(8)));
		return context.defNames.get(key) ?? "unknown";
	}
	return "unknown";
}
function renderUnknownSchema(schema, context) {
	if (schema.properties || schema.additionalProperties) return renderObject(schema, context);
	if (schema.items || schema.prefixItems) return renderArray(schema, context);
	return "unknown";
}
function renderObject(schema, context) {
	const properties = schema.properties ?? {};
	const required = new Set(schema.required ?? []);
	const entries = Object.entries(properties);
	const additional = schema.additionalProperties;
	if (entries.length === 0 && additional && typeof additional === "object") return `Record<string, ${renderSchema(additional, context)}>`;
	if (entries.length === 0) return additional === false ? "{}" : "Record<string, unknown>";
	const lines = entries.flatMap(([key, property]) => {
		const optional = required.has(key) ? "" : "?";
		const description = renderDescription(property.description);
		const member = `${formatPropertyKey(key)}${optional}: ${renderSchema(property, context)};`;
		return description ? [description, member] : [member];
	});
	if (additional && typeof additional === "object") {
		const additionalType = renderSchema(additional, context);
		const propertyTypes = entries.map(([, property]) => renderSchema(property, context));
		lines.push(`[key: string]: ${renderUnion([additionalType, ...propertyTypes])};`);
	} else if (additional === true) lines.push("[key: string]: unknown;");
	return `{\n${indent(lines.join("\n"))}\n}`;
}
function renderArray(schema, context) {
	if (schema.prefixItems) return `[${schema.prefixItems.map((item) => renderSchema(item, context)).join(", ")}]`;
	if (Array.isArray(schema.items)) return `[${schema.items.map((item) => renderSchema(item, context)).join(", ")}]`;
	return `${parenthesizeUnion(renderSchema(schema.items, context))}[]`;
}
function renderUnion(types) {
	const uniqueTypes = [...new Set(types)];
	if (uniqueTypes.length === 0) return "never";
	return uniqueTypes.join(" | ");
}
function renderLiteral(value) {
	if (typeof value === "string") return JSON.stringify(value);
	if (typeof value === "number" || typeof value === "boolean" || value === null) return String(value);
	return "unknown";
}
function renderDescription(description) {
	if (!description) return;
	return `/** ${description.replaceAll("*/", "*\\/").trim()} */`;
}
function parenthesizeUnion(type) {
	return type.includes(" | ") ? `(${type})` : type;
}
function indent(value) {
	return value.split("\n").map((line) => `\t${line}`).join("\n");
}
function formatPropertyKey(key) {
	return /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
}
function getDefinitionName(key) {
	const name = key.split(/[^A-Za-z0-9_$]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
	if (!name) return "Schema";
	if (/^\d/.test(name)) return `Schema${name}`;
	return name;
}
function decodeJsonPointerToken(value) {
	return value.replaceAll("~1", "/").replaceAll("~0", "~");
}
function getAvailableName(baseName, usedNames) {
	let name = baseName;
	let index = 1;
	while (usedNames.has(name)) {
		name = index === 1 ? `${baseName}Def` : `${baseName}Def${index}`;
		index++;
	}
	usedNames.add(name);
	return name;
}

//#endregion
export { getToolTypeStrings, schemaToTypeString };