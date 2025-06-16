import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction } from 'wagmi';

export const useTransaction = () => {
    const { address } = useAppKitAccount();
    const { sendTransaction, data: hash } = useSendTransaction();

    const handleSendTx = (txObject) => {
        try {
            sendTransaction({
                ...txObject,
            });
        } catch (err) {
            console.log('Error sending transaction:', err);
        }
    };

    return {
        handleSendTx,
        hash,
    };
};
