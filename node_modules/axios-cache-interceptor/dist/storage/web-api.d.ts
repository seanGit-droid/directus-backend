/*!
 * Axios Cache Interceptor 1.11.1
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
/**
 * Creates a simple storage. You can persist his data by using `sessionStorage` or
 * `localStorage` with it.
 *
 * **ImplNote**: Without polyfill, this storage only works on browser environments.
 *
 * @example
 *
 * ```js
 * const fromLocalStorage = buildWebStorage(localStorage);
 * const fromSessionStorage = buildWebStorage(sessionStorage);
 *
 * const myStorage = new Storage();
 * const fromMyStorage = buildWebStorage(myStorage);
 * ```
 *
 * @param storage The type of web storage to use. localStorage or sessionStorage.
 * @param prefix The prefix to index the storage. Useful to prevent collision between
 *   multiple places using the same storage.
 * @param {number} maxStaleAge The maximum age in milliseconds a stale entry can stay
 *   in the storage before being removed. Otherwise, stale-able entries would stay
 *   indefinitely causing a memory leak eventually. 1 hour (3_600_000) is default
 */
export declare function buildWebStorage(storage: Storage, prefix?: string, maxStaleAge?: number): import("./types.js").AxiosStorage;
//# sourceMappingURL=web-api.d.ts.map