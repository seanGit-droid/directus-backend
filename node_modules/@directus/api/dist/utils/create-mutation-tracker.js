import { useEnv } from "@directus/env";
import { InvalidPayloadError } from "@directus/errors";

//#region src/utils/create-mutation-tracker.ts
/**
* Create a mutation tracker that enforces the `MAX_BATCH_MUTATION` limit across a batch of writes.
*/
function createMutationTracker(initialCount = 0) {
	const env = useEnv();
	const maxCount = Number(env["MAX_BATCH_MUTATION"]);
	let mutationCount = initialCount;
	return {
		trackMutations(count) {
			mutationCount += count;
			if (mutationCount > maxCount) throw new InvalidPayloadError({ reason: `Exceeded max batch mutation limit of ${maxCount}` });
		},
		getCount() {
			return mutationCount;
		}
	};
}

//#endregion
export { createMutationTracker };