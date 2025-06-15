import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = "f4fff60803492dd959d54e3c4aea8445" 


const bscTestnet = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
        'https://data-seed-prebsc-2-s1.binance.org:8545/',
        'https://data-seed-prebsc-1-s2.binance.org:8545/',
        'https://data-seed-prebsc-2-s2.binance.org:8545/'
      ],
    },
    public: {
      http: [
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
        'https://data-seed-prebsc-2-s1.binance.org:8545/',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan Testnet',
      url: 'https://testnet.bscscan.com/',
    },
  },
  testnet: true,
}



if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'TCC20 Stack',
  description: 'A Decentralized Earning Platform',
  url: 'https://champstake.tcc20.io/',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Networks array (no type assertion needed in JS)
export const networks = [bscTestnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
