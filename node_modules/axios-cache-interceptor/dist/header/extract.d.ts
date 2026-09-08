/*!
 * Axios Cache Interceptor 1.11.1
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { AxiosRequestHeaders, AxiosResponseHeaders } from 'axios';
/**
 * Extracts specified header values from request headers.
 * Generic utility for extracting a subset of headers.
 *
 * @param requestHeaders The full request headers object
 * @param headerNames Array of header names to extract
 * @returns Object with extracted header values
 */
export declare function extractHeaders(requestHeaders: AxiosRequestHeaders | AxiosResponseHeaders, headerNames: string[]): Record<string, string | undefined>;
//# sourceMappingURL=extract.d.ts.map