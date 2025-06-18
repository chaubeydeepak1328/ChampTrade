import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = "30f2790c9f15233c3b52c515d6adfe40"


// const bscTestnet = {
//   id: 97,
//   name: 'BNB Smart Chain Testnet',
//   nativeCurrency: {
//     name: 'BNB',
//     symbol: 'BNB',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: [
//         'https://data-seed-prebsc-1-s1.binance.org:8545/',
//         'https://data-seed-prebsc-2-s1.binance.org:8545/',
//         'https://data-seed-prebsc-1-s2.binance.org:8545/',
//         'https://data-seed-prebsc-2-s2.binance.org:8545/'
//       ],
//     },
//     public: {
//       http: [
//         'https://data-seed-prebsc-1-s1.binance.org:8545/',
//         'https://data-seed-prebsc-2-s1.binance.org:8545/',
//       ],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'BscScan Testnet',
//       url: 'https://testnet.bscscan.com/',
//     },
//   },
//   testnet: true,
// }



const bscMainnet = {
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://bsc-dataseed.bnbchain.org',
        'https://bsc-dataseed.bnbchain.org',
        'https://bsc-dataseed.nariox.org'
      ],
    },
    public: {
      http: [
        'https://bsc-dataseed.defibit.io',
        'https://bsc-dataseed.ninicoin.io',
        'https://bsc-dataseed-public.bnbchain.org'
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com/',
    },
  },
  testnet: false,
}


if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'TCC20 Champ Trade',
  description: 'A Decentralized Earning Platform',
  url: 'https://champtrade.tcc20.io/',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Networks array (no type assertion needed in JS)
export const networks = [bscMainnet]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig
