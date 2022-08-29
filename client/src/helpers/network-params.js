import { DEFAULT_NETWORK, Networks } from '../constants/blockchain';

export const getNetworkParams = (network = DEFAULT_NETWORK) => {
    const infuraApiKey = import.meta.env.VITE_INFURA_API_KEY;

    const localNetParams = {
        chainId: `0x${Networks.LOCAL_NET.toString(16)}`,
        chainName: 'Ethereum Ganache',
        rpcUrls: ['http://127.0.0.1:7545'],
        blockExplorerUrls: [],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        }
    };

    const testNetParams = {
        chainId: `0x${Networks.TEST_NET.toString(16)}`,
        chainName: 'Rinkeby Test Network',
        rpcUrls: [`https://rinkeby.infura.io/v3/${infuraApiKey}`],
        blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
        }
    };

    switch (network) {
        case Networks.LOCAL_NET:
            return localNetParams;
        case Networks.TEST_NET:
            return testNetParams;
        default:
            return localNetParams;
    }
};
