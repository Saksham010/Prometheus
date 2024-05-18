import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {ETHTOKENLIST,BSCTOKENLIST,DUMMYLIST,CHAINLIST as chainData} from "../constants/tokenlist";
import { customStyles,customStylesToken } from '../constants/modalstyle';
import { ERC20ABI } from '../constants/ABI';
import { CHAIN_TO_RPC } from '../constants/rpcproviders';
import { ethers } from 'ethers';
import ETHLOGO from "../assets/ethereum.webp";
//Bind modal
Modal.setAppElement('#root');

export default function ChainModal({modalIsOpen,setIsOpen,setChoosenChain,choosenChain,isChainModal,tokenModalId,setTokenOne,setTokenTwo}) {
  const [tokenData,setTokenData] = useState(DUMMYLIST);
  const [inputAddress,setInputAddress] = useState("");
  const [loader,setLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  //Token list
  function setTokenList(chain){
    switch(chain){
      case 'Ethereum':
        setTokenData(()=>[...ETHTOKENLIST]);
        break;
      case 'BSC':
        setTokenData(()=>[...BSCTOKENLIST]);
        break;
      default:
        setTokenData(()=>[...ETHTOKENLIST]); 
        break;
    }

  }

  //Update the token list
  useEffect(()=>{
    setTokenList(choosenChain);
  },[choosenChain])

  
  // Get token detail
  useEffect(()=>{
    const fetchTokenData = async (tokenAddress) => {
      const rpcURL = CHAIN_TO_RPC[choosenChain];
      const provider = new ethers.JsonRpcProvider(rpcURL);
      const tokenContract = new ethers.Contract(tokenAddress,ERC20ABI,provider);
      try {
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const decimals = await tokenContract.decimals();
        setTokenData([{name:name,symbol:symbol,img:ETHLOGO,address:inputAddress, decimals:decimals}]);
      }catch(err){
        // console.log("Error while fetching data: ",err);
        setShowError(true);

      }
    }
    //EVM compatible address
    if(inputAddress.length == 42){
      //Search for token data
      fetchTokenData(inputAddress);
    }else if(inputAddress.length == 0){
      setTokenList(choosenChain);
      // Reset token found
      setShowError(false);

    }

  },[inputAddress])


  function closeModal() {
    setIsOpen(false);
  }

  const chainElements = chainData.map((chainName,index)=>{

    return(
      
        <div key={index}>
            <button className='w-full px-4 py-2 bg-black hover:opacity-85' onClick={()=>{setChoosenChain(chainName); closeModal()}}><label className='text-white text-[0.6rem] font-thin hover:cursor-pointer'>{chainName}</label></button>
        </div>
    )
  })

  const tokenList = tokenData.map((token,index)=>{
    return(
      <div key={index} className='px-5 py-3 hover:bg-gray-100 hover:cursor-pointer hover:opacity-80' onClick={()=>{tokenModalId===1?setTokenOne({name:token.name,symbol:token.symbol,address:token.address}):setTokenTwo({name:token.name,symbol:token.symbol,address:token.address}); closeModal()}}>
        <div className='flex'>
          {/* Logo */}
          <div >
            <img src={token.img} width={45} height={45}></img>
          </div>
          {/* Label */}
          <div className='pl-2 flex flex-col justify-start pt-2'>
              <label className='text-sm tracking-tighter'>{token.name}</label>
              <label className='text-[8px] text-zinc-300 tracking-tighter'>{token.symbol}</label>
          </div>
        </div>
      </div>
    )
  })

  const tokenElement = () =>{
    console.log("Showing token element")
    return(
      <div>
        <div className='p-5'>

          <div className='pt-2 pb-4'>
            <h1 className='tracking-tighter'>Select a token</h1>
          </div>

          <div className='border-2 px-2 flex items-center'>
            <div >
              <svg stroke='#D3D3D3' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
              </svg>
            </div>
            <div className='w-full'>
              <input value={inputAddress} onFocus={()=>{setLoader(true)}} onChange={(e)=>{setInputAddress(e.target.value)}} placeholder='Paste your token address' className='w-full text-lg text-gray-500	p-2 focus:outline-none'></input>
            </div>
          </div>

        </div>

        {/* Token container */}
        <div className={`${loader?'animate-pulse':''} text-center py-2`}>
          {showError ? <label className='tracking-tighter text-xs'>Token not found</label>:tokenList}
        </div>


      </div>
    )
  }



  return (
    <div>

      {isChainModal?      
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Multimodal"
          >
            <div>
              <div className='grid grid-cols-3 gap-4'>{chainElements}</div>
            </div>
          </Modal> 
          :
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStylesToken}
            contentLabel="Multimodal"
          >
            <div>
              {tokenElement()}
    
            </div>
          </Modal>
      }
    </div>
  );
}

