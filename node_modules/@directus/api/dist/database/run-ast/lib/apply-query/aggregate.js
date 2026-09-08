//#region src/database/run-ast/lib/apply-query/aggregate.ts
function applyAggregate(schema, dbQuery, aggregate, collection, options) {
	const { hasJoins, hasMultiRelationalFilter, hasMultiRelationalSort } = options;
	const primaryKey = schema.collections[collection].primary;
	const dedupeCount = hasMultiRelationalFilter || hasMultiRelationalSort;
	for (const [operation, fields] of Object.entries(aggregate)) {
		if (!fields) continue;
		if (operation === "countAll" && dedupeCount) {
			dbQuery.countDistinct(`${collection}.${primaryKey}`, { as: "countAll" });
			continue;
		}
		if (operation === "countAll") {
			dbQuery.count("*", { as: "countAll" });
			continue;
		}
		for (const field of fields) {
			if (operation === "count" && dedupeCount && field === "*") {
				dbQuery.countDistinct(`${collection}.${primaryKey}`, { as: "count" });
				continue;
			}
			if (operation === "count" && dedupeCount && field === primaryKey) {
				dbQuery.countDistinct(`${collection}.${field}`, { as: `count->${field}` });
				continue;
			}
			if (operation === "count" && field === "*") {
				dbQuery.count("*", { as: "count" });
				continue;
			}
			if (operation === "countDistinct" && !hasJoins && schema.collections[collection]?.primary === field) {
				dbQuery.count(`${collection}.${field}`, { as: `countDistinct->${field}` });
				continue;
			}
			if ([
				"count",
				"countDistinct",
				"avg",
				"avgDistinct",
				"sum",
				"sumDistinct",
				"min",
				"max"
			].includes(operation)) dbQuery[operation](`${collection}.${field}`, { as: `${operation}->${field}` });
		}
	}
}

//#endregion
export { applyAggregate };