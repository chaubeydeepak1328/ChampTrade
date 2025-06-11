import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type { AppKitNetwork } from '@reown/appkit/networks'

// ✅ Your WalletConnect project ID
export const projectId = '5a7ca96b4c20a6f220b969a9e91203d8'; // Public for localhost use

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// ✅ Ramestta Network definition (typed as AppKitNetwork)
const ramesttaNetwork: AppKitNetwork = {
  id: 1370,
  name: 'Ramestta',
  nativeCurrency: {
    name: 'Rama',
    symbol: 'RAMA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://blockchain.ramestta.com',
        'https://blockchain2.ramestta.com',
      ],
    },
    public: {
      http: [
        'https://blockchain.ramestta.com',
        'https://blockchain2.ramestta.com',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ramascan',
      url: 'https://ramascan.com/',
    },
  },
  testnet: false,
};

// ✅ Required tuple typing for AppKit
export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [ramesttaNetwork];

// ✅ Metadata for WalletConnect modal
export const metadata = {
  name: 'Universe',
  description: 'A Decentralized Earning Platform',
  url: 'https://dapp.ramauniverse.io',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// ✅ Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// ✅ Export wagmi config for WagmiProvider
export const config = wagmiAdapter.wagmiConfig;
