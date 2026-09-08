import { assets } from "./assets/index.js";
import { collections } from "./collections/index.js";
import { fields } from "./fields/index.js";
import { files } from "./files/index.js";
import { flows } from "./flows/index.js";
import { folders } from "./folders/index.js";
import { items } from "./items/index.js";
import { operations } from "./operations/index.js";
import { relations } from "./relations/index.js";
import { schema } from "./schema/index.js";
import { system } from "./system/index.js";
import { triggerFlow } from "./trigger-flow/index.js";
import { MountedToolRegistry, ToolRegistry } from "./registry.js";

//#region src/ai/tools/index.ts
const ALL_TOOLS = [
	system,
	items,
	files,
	folders,
	assets,
	flows,
	triggerFlow,
	operations,
	schema,
	collections,
	fields,
	relations
];

//#endregion
export { ALL_TOOLS, MountedToolRegistry, ToolRegistry, collections, fields, files, flows, items, operations, relations, schema, system, triggerFlow };