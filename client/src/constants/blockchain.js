export const TOKEN_DECIMALS = 18;

export const Networks = {
    TEST_NET: 4,
    LOCAL_NET: 1337
};

export const currentNetwork = () => {
    const network = import.meta.env.VITE_BLOCKCHAIN_NETWORK;

    switch (network) {
        case 'localnet':
            return Networks.LOCAL_NET;
        case 'testnet':
            return Networks.TEST_NET;
        default:
            return Networks.LOCAL_NET;
    }
};

export const DEFAULT_NETWORK = currentNetwork();
