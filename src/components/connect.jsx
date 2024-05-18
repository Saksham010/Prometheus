import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function ConnectWallet({handleSwap,state:walletState,setWalletData}){
    return(
    <div>
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
                                <button className='w-full py-2 bg-black hover:opacity-85' onClick={openConnectModal}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>{walletState.connected?"OMNISWAP":"Connect wallet"}</label></button>
                                );
                            }

                            if (chain.unsupported) {
                                return (

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
              
                                <button className='w-full py-2 bg-black hover:opacity-85' onClick={handleSwap}><label className='text-white text-[0.7rem] font-medium hover:cursor-pointer'>OMNISWAP</label></button>
                            );
                            })()}
                        </div>
                        );
                    }}
        </ConnectButton.Custom>
    </div>
    )
}