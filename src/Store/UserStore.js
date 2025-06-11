import { create } from 'zustand';
import Web3, { errors } from 'web3';
import axios from 'axios';
import Swal from 'sweetalert2';
import CONTRACT_ABI from './CONTRACT_ABI.json';




const CONTRACT_ADDRESS = "0xa6e74cae22C51c35C89A9941243869a99af442AE"

const INFURA_URL = "https://bsc-testnet.infura.io/v3/32193d86ae664f1188540cfca7b790cf"
const web3 = new Web3(INFURA_URL);






export const useStore = create((set, get) => ({


}));
