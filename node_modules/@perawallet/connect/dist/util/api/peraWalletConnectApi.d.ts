/**
 * @returns {string[]} Bridge server list
 */
declare function listBridgeServers(): Promise<{
    servers: string[];
}>;
/**
 * If there's a bridge URL in local storage returns it
 * otherwise fetches the available servers and picks a random one and saves it to local storage
 *
 * @returns {string} Bridge URL
 */
declare function assignBridgeURL(): Promise<string>;
export { assignBridgeURL, listBridgeServers };
