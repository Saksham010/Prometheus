import USDCLOGO from "../assets/usdc.png";
import ETHLOGO from "../assets/ethereum.webp";
import WETHLOGO from "../assets/wrappedeth.png";
import USDTLOGO from "../assets/tether.png";
import AAVELOGO from "../assets/aave.png";
import UNILOGO from "../assets/uniswap.png";
import CHAINLINKLOGO from "../assets/chainlink.png";
import BINANCELOGO from "../assets/binance.png";
import WBINANCELOGO from "../assets/wrappedbinance.png";
import BUSDLOGO from "../assets/busd.webp";
import SHIBALOGO from "../assets/shiba.webp";
import PANCAKELOGO from "../assets/cake.webp";

export const CHAINLIST = ["Ethereum","BSC","Solana","Avax","Zksync","Starknet"];
export const CHAIN_TO_NATIVE = {
    Ethereum:'ETH',
    BSC:'BNB',
    Solana:'SOL',
    Avax:'AVAX',
    Zksync:'ETH',
    Starknet:'STRK'
};

export const IS_EVM_COMPATIBLE = {
    Ethereum:true,
    BSC:true,    
}

export const DUMMYLIST = [
    {name:'Ether',symbol:'ETH',img:ETHLOGO,address:'NATIVE'},
    {name:'Wrapped Ether',symbol:'WETH',img:WETHLOGO,address:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
    {name:'USDCoin',symbol:'USDC',img:USDCLOGO,address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
    {name:'Tether USD',symbol:'USDT',img:USDTLOGO,address:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {name:'Aave',symbol:'AAVE',img:AAVELOGO,address:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'},
    {name:'Uniswap',symbol:'UNI',img:UNILOGO,address:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'},
    {name:'Chainlink',symbol:'LINK',img:CHAINLINKLOGO,address:'0x514910771AF9Ca656af840dff83E8264EcF986CA'},
];

export const ETHTOKENLIST = [  
    {name:'Ether',symbol:'ETH',img:ETHLOGO,address:'NATIVE'},
    {name:'Wrapped Ether',symbol:'WETH',img:WETHLOGO,address:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'},
    {name:'USDCoin',symbol:'USDC',img:USDCLOGO,address:'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'},
    {name:'Tether USD',symbol:'USDT',img:USDTLOGO,address:'0xdAC17F958D2ee523a2206206994597C13D831ec7'},
    {name:'Aave',symbol:'AAVE',img:AAVELOGO,address:'0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'},
    {name:'Uniswap',symbol:'UNI',img:UNILOGO,address:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'},
    {name:'Chainlink',symbol:'LINK',img:CHAINLINKLOGO,address:'0x514910771AF9Ca656af840dff83E8264EcF986CA'},
];

export const BSCTOKENLIST = [  
    {name:'Binance Coin',symbol:'BNB',img:BINANCELOGO,address:'NATIVE'},
    {name:'Wrapped BNB',symbol:'WBNB',img:WBINANCELOGO,address:'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'},
    {name:'USDCoin',symbol:'USDC',img:USDCLOGO,address:'0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2'},
    {name:'Binance USD',symbol:'BUSD',img:BUSDLOGO,address:'0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'},
    {name:'Pancakeswap',symbol:'CAKE',img:PANCAKELOGO,address:'0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'},
    {name:'Shiba Inu',symbol:'SHIB',img:SHIBALOGO,address:'0x2859e4544C4bB03966803b044A93563Bd2D0DD4D'},
    {name:'Chainlink',symbol:'LINK',img:CHAINLINKLOGO,address:'0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD'},
];