/// <reference types="react" />
import "./_pera-wallet-modal.scss";
interface PeraWalletConnectModalProps {
    uri: string;
    onClose: () => void;
}
declare function PeraWalletConnectModal({ uri, onClose }: PeraWalletConnectModalProps): JSX.Element;
export default PeraWalletConnectModal;
