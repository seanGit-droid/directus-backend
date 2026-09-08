import database_default from "../database/index.js";
import { scheduleSynchronizedJob } from "../utils/schedule.js";
import { sendReport } from "../telemetry/lib/send-report.js";
import "../telemetry/index.js";
import { useEnv } from "@directus/env";
import { toBoolean } from "@directus/utils";
import { random } from "lodash-es";
import { version } from "directus/version";

//#region src/schedules/project.ts
/**
* Schedule the project status job
*
* @returns Whether or not the project status job has been initialized
*/
async function schedule() {
	if (toBoolean(useEnv()["PROJECT_OWNER_ENABLED"]) === false) return false;
	const db = database_default();
	scheduleSynchronizedJob("project-status", `${random(59)} ${random(23)} * * *`, async () => {
		const { project_status,...ownerInfo } = await db.select("project_status", "project_owner", "project_usage", "org_name", "product_updates", "project_id").from("directus_settings").first();
		if (project_status !== "pending") return;
		try {
			await sendReport({
				version,
				...ownerInfo
			});
			await db.update("project_status", "").from("directus_settings");
		} catch {}
	});
	return true;
}

//#endregion
export { schedule as default };