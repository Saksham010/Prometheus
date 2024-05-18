import Navbar from '../components/nav';
import Footer from '../components/footer';
// import ConnectWallet from '../components/connect';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ChainModal from "../modals/chainmodal";

import prometheusResized from "/prometheusresized.png";
import { updateWallet,getWallet } from "../redux/walletSlice";
import { useSelector,useDispatch } from "react-redux";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {CHAIN_TO_NATIVE,IS_EVM_COMPATIBLE} from "../constants/tokenlist";
import {CHAIN_TO_RPC} from "../constants/rpcproviders";
import {ERC20ABI} from "../constants/ABI";

function Trade() {
  const walletState = useSelector(getWallet);
  const dispatch = useDispatch();
  const { openConnectModal } = useConnectModal();
  const [walletData,setWalletData] = useState({
    chainId:null,
    chainName:null,
    walletAddress:null,
    connected:false,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [choosenChain, setChoosenChain] = useState("Ethereum");
  const [isChainModal,setIsChainModal] = useState(true);
  const [tokenOne,setTokenOne] = useState({symbol:'ETH',address:'NATIVE'});
  const [tokenTwo,setTokenTwo] = useState({symbol:'UNI',address:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'});
  const [tokenModalId, setTokenModalId] = useState(0);


  function openModal(isChainType) {
    setIsOpen(true);
    setIsChainModal(isChainType);

  }

  const handleSwap = () =>{
    if(walletState.connected === false){
      // Connect wallet
      const accountData = openConnectModal();
      

    }

  }

  //Update provider data
  useEffect(()=>{
    if(walletData.connected){
      //Dispatch wallet data
      dispatch(updateWallet({...walletData}))
    }

  },[walletData])

  //Change address
  useEffect(()=>{
    switch(choosenChain){
      case 'Ethereum':
        setTokenOne({name:'Ether',symbol:'ETH',address:'NATIVE'});
        break;
      case 'BSC':
        setTokenOne({name:'Binance Coin',symbol:'BNB',address:'NATIVE'});
        break;
      default:
        setTokenOne({name:'Ether',symbol:'ETH',address:'NATIVE'}); 
        break;
    }

  },[choosenChain]);

  // Fetch token balance
  useEffect(()=>{

    async function fetchBalance(){
      const rpcURL = CHAIN_TO_RPC[choosenChain];
      const provider = new ethers.JsonRpcProvider(rpcURL);

      //Native token
      if(tokenOne.address === "NATIVE" && CHAIN_TO_NATIVE[choosenChain] === tokenOne.symbol){
        const balance = await provider.getBalance(walletData.walletAddress);
        console.log("Native ",tokenOne.symbol, " balance: ",balance);
      }else{
        // Non native token
        if(IS_EVM_COMPATIBLE[choosenChain]){
          const tokenContract = new ethers.Contract(tokenOne.address,ERC20ABI,provider);
          const _balance = await tokenContract.balanceOf(walletData.walletAddress);
          console.log(`${tokenOne.symbol} balance: `,_balance);
        }else{
          console.log("Not evm compatible chain");
          //Left to implement
          
        }
      }

    }
    // If wallet is connected then only fetch balance
    if(walletData.connected){
      fetchBalance();
    } 


  },[tokenOne,walletData])


  return (
    <div className='flex flex-col min-h-screen mb-auto'>
      {modalIsOpen && <ChainModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} choosenChain={choosenChain} setChoosenChain={setChoosenChain} isChainModal={isChainModal} tokenModalId={tokenModalId} setTokenOne={setTokenOne} setTokenTwo={setTokenTwo}/>}
      <Navbar/>
      <div className='my-auto'>
        <div className='w-max mx-auto flex flex-col items-center '>
          <div className='text-center'>
            <h1>Swap whatever anywhere</h1>
          </div>
          {/* Container */}
          <div className='w-full pt-4'>
              <div className='text-center pb-2 w-full'>
                  <button className='w-full py-2 bg-black hover:opacity-85' onClick={()=>{openModal(true)}}><label className='text-white text-[0.6rem] font-thin hover:cursor-pointer'>CHAIN : {choosenChain}</label></button>
              </div>
              {/* From container */}
              <div className='flex justify-between'>
                <div className='border-2 border-black w-full'>
                  <input className='w-full h-full text-lg text-gray-500	px-2 focus:outline-none'></input>
                </div>
                <div className='px-2'>

                </div>
                <div className='flex border-2 bg-black border-black px-4 py-2 hover:cursor-pointer hover:opacity-85' onClick={()=>{openModal(false);setTokenModalId(1)}}>
                  {/* Logo container */}
                  <div>
                    <div><img src=""></img></div>
                  </div>
                  <div>
                    <label className='text-[0.6rem] text-white  tracking-tighter font-thin hover:cursor-pointer'>{tokenOne.symbol}</label>
                  </div>
                </div>

              </div>
              {/* Price container */}
              <div className='py-2 flex justify-between'>
                <div className='bg-black w-max py-2 px-3.5 hover:opacity-85 hover:cursor-pointer'>
                  <label className='text-md text-white tracking-tighter font-bold hover:cursor-pointer'>⇆</label>
                </div>
                <div className='bg-black w-max p-2 hover:opacity-85 hover:cursor-pointer'>
                  <label className='text-[0.6rem] text-white  tracking-tighter font-thin hover:cursor-pointer'>MAX</label>

                </div>

              </div>
              {/* To container */}
              <div className='flex justify-between '>
                <div className='flex border-2 bg-black border-black px-4 py-2 hover:cursor-pointer hover:opacity-85' onClick={()=>{openModal(false);setTokenModalId(2)}}>
                  {/* Logo container */}
                  <div>
                    <div><img src=""></img></div>
                  </div>
                  <div>
                    <label className='text-[0.6rem] text-white  tracking-tighter font-thin hover:cursor-pointer'>{tokenTwo.symbol}</label>
                  </div>
                </div>
          
                <div className='px-2'>

                </div>
                <div className='border-2 border-black w-full'>
                  <input className='w-full h-full text-lg text-gray-500	px-2 focus:outline-none'></input>
                </div>

              </div>
 
              {/* Swap button */}
              <div className='text-center pt-2 w-full'>
                  {/* <button className='w-full py-2 bg-black hover:opacity-85' onClick={handleSwap}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>{walletState.connected?"OMNISWAP":"Connect wallet"}</label></button> */}
                  <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        // Note: If your app doesn't use authentication, you
                        // can remove all 'authenticationStatus' checks
                        const ready = mounted && authenticationStatus !== 'loading';
                        const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                        return (
                        <div
                            {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                            })}
                        >
                            {(() => {
                            if (!connected) {
                                return (
                                // <button onClick={openConnectModal} type="button" className="border text-white bg-black py-2 px-4 hover:opacity-85">
                                //     <a>Connect Wallet</a>
                                // </button>
                                <button className='w-full py-2 bg-black hover:opacity-85' onClick={openConnectModal}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>{walletState.connected?"OMNISWAP":"Connect wallet"}</label></button>
                                  // <div></div>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                // <button onClick={openChainModal} type="button" className="border text-white bg-black py-2 px-4 hover:opacity-85">
                                //     <a>Wrong network</a>
                                // </button>
                                <button className='w-full py-2 bg-black hover:opacity-85' onClick={openChainModal}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>{walletState.connected?"OMNISWAP":"Wrong Network"}</label></button>
                              );
                            }

                            // If connected and chain supported
                            if(connected && !chain.unsupported){
                              const connectedWalletData = {
                                chainId:chain.id,
                                chainName:chain.name,
                                walletAddress:account.address,
                                connected:true,
                              }
                              if(connected !== walletState.connected){
                                //Update wallet state
                                setWalletData(()=>{
                                  return {...connectedWalletData};
                                } )
                                // console.log("Reaching this point");
                              }
                            
                            }

                            return (
                                // <div style={{ display: 'flex', gap: 12 }}>
                                // <button
                                //     onClick={openChainModal}
                                //     style={{ display: 'flex', alignItems: 'center' }}
                                //     type="button"
                                //     className="border text-white bg-black py-2 px-4 hover:opacity-85"
                                // >
                                //     {chain.hasIcon && (
                                //     <div
                                //         style={{
                                //         background: chain.iconBackground,
                                //         width: 12,
                                //         height: 12,
                                //         borderRadius: 999,
                                //         overflow: 'hidden',
                                //         marginRight: 4,
                                //         }}
                                //     >
                                //         {chain.iconUrl && (
                                //         <img
                                //             alt={chain.name ?? 'Chain icon'}
                                //             src={chain.iconUrl}
                                //             style={{ width: 12, height: 12 }}
                                //         />
                                //         )}
                                //     </div>
                                //     )}
                                //     <a>{chain.name}</a>
                                // </button>

                                // <button onClick={openAccountModal} type="button" className="border text-white bg-black py-2 px-4 hover:opacity-85">
                                //     <a>
                                //         {account.displayName}
                                //         {account.displayBalance
                                //         ? ` (${account.displayBalance})`
                                //         : ''}
                                //     </a>
                                // </button>
                                // </div>
                                <button className='w-full py-2 bg-black hover:opacity-85' onClick={handleSwap}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>OMNISWAP</label></button>

                                // <div>After connection: {chain.name} {account.address}</div>
                            );
                            })()}
                        </div>
                        );
                    }}
                  </ConnectButton.Custom>
              </div>

          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Trade
