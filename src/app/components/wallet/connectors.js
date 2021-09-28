import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
    supportedChainsIds: [1, 3, 4, 5, 42]
});
