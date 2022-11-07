/// <reference types="react" />
import "../_pera-wallet-modal.scss";
import "./_pera-wallet-redirect-modal.scss";
interface PeraWalletRedirectModalProps {
    onClose: () => void;
}
declare function PeraWalletRedirectModal({ onClose }: PeraWalletRedirectModalProps): JSX.Element;
export default PeraWalletRedirectModal;
