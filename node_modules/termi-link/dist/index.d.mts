declare const ANSI_RESET = "\u001B[0m";
/**
 * Creates a clickable terminal link sequence of characters. The url provided will be sanitized to remove control characters.
 *
 * @param text The text to display, if an empty string `""` is passed, the text will be the same as the url, and in the fallback case, the link will be the only thing displayed.
 * @param url The URL to link to
 * @param options Optional parameters
 * @param options.fallback Override the default fallback or disable fallback. When function provided, it receives the `text` and `url` as parameters and is expected to return a string.
If set to `false`, there will be an empty string returned when a terminal is unsupported.
 * @returns Formatted terminal link string
 */
declare function terminalLink(text: string, url: string, options?: {
    fallback?: false | ((text: string, url: string) => string);
} | undefined): string;
/**
 * Checks if the terminal supports hyperlinks.
 * @returns boolean indicating hyperlink support
 */
declare function isSupported(): boolean;

export { ANSI_RESET, isSupported, terminalLink };
