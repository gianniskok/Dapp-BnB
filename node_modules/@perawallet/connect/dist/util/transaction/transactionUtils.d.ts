import { Transaction } from "algosdk";
declare function encodeUnsignedTransactionInBase64(txn: Transaction): string;
declare function base64ToUint8Array(data: string): Uint8Array;
export { encodeUnsignedTransactionInBase64, base64ToUint8Array };
