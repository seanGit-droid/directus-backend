/**
 * Retrieves the version of a package from its package.json file.
 * If the package.json file cannot be read, it defaults to the Node.js version.
 */
declare function getPackageVersion(baseDir: string): string;
declare function getPackageName(baseDir: string): string | undefined;

export { getPackageName, getPackageVersion };
