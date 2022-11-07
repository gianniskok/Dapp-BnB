/**
 * Wrapper function for browser's fetch API.
 *
 * @param {string} url API URL
 * @param {RequestInit} config RequestInit object
 * @returns {any}
 */
declare function fetcher<T>(url: string, config?: RequestInit): Promise<T>;
export default fetcher;
