import { DatabaseHelper } from "../types.js";
import { GEOMETRY_TYPES } from "@directus/constants";
import { stringify } from "wellknown";

//#region src/database/helpers/geometry/types.ts
var GeometryHelper = class extends DatabaseHelper {
	supported() {
		return true;
	}
	/**
	* Extract the geometry subtype from a field's type
	*
	* @return geometry subtype if found
	*/
	geometrySubtype(field) {
		const subtype = field.type.split(".")[1];
		if (!subtype) return null;
		return GEOMETRY_TYPES.find((value) => value.toLowerCase() === subtype.toLowerCase()) || null;
	}
	isTrue(expression) {
		return expression;
	}
	isFalse(expression) {
		return expression.wrap("NOT ", "");
	}
	createColumn(table, field) {
		const type = this.geometrySubtype(field) ?? "geometry";
		return table.specificType(field.field, type);
	}
	asText(table, column, alias) {
		if (alias) return this.knex.raw("st_astext(??.??) as ??", [
			table,
			column,
			alias
		]);
		return this.knex.raw("st_astext(??.??)", [table, column]);
	}
	fromText(text) {
		return this.knex.raw("st_geomfromtext(?, 4326)", text);
	}
	fromGeoJSON(geojson) {
		return this.fromText(stringify(geojson));
	}
	_intersects(key, geojson) {
		const geometry = this.fromGeoJSON(geojson);
		return this.knex.raw("st_intersects(??, ?)", [key, geometry]);
	}
	intersects(key, geojson) {
		return this.isTrue(this._intersects(key, geojson));
	}
	nintersects(key, geojson) {
		return this.isFalse(this._intersects(key, geojson));
	}
	_intersects_bbox(key, geojson) {
		const geometry = this.fromGeoJSON(geojson);
		return this.knex.raw("st_intersects(??, ?)", [key, geometry]);
	}
	intersects_bbox(key, geojson) {
		return this.isTrue(this._intersects_bbox(key, geojson));
	}
	nintersects_bbox(key, geojson) {
		return this.isFalse(this._intersects_bbox(key, geojson));
	}
	collect(table, column) {
		return this.knex.raw("st_astext(st_collect(??.??))", [table, column]);
	}
};

//#endregion
export { GeometryHelper };