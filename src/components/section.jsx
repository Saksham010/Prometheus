import sectionImg from "/section.png"
import {useNavigate} from "react-router-dom";

export default function Section(){
    const navigate = useNavigate();
    return(
        <>
            <div className="max-w-8xl mx-auto flex py-8 px-12 items-center mb-auto">
                <div className=" basis-7/12">
                    <div>
                        <h1 className="text-3xl">Omniswap Interface</h1>
                    </div>
                    <br></br>
                    <div>
                        <p className="text-[0.6rem] tracking-tighter ">Getting tired of hopping from one dex to another dex? Days of hopping over multiple dex are over. Prometheus provides an omniswap interface that allows you to make your trade on multiple dex across multiple chains.</p>
                        <div className="pt-4">
                            <p className="text-[0.65rem] tracking-tighter ">Supported chains:</p>
                        </div>

                        <div className="pt-2 *:mt-1 *:block *:cursor-auto ">
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">1. Ethereum (Uniswap)</p></button>
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">2. Binance Smart Chain (Pancakeswap)</p></button>
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">3. Solana (Raydium)</p></button>
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">4. Starknet (Jediswap)</p></button>
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">5. Zksync (Zkswap)</p></button>
                            <button className="border bg-black"><p className="text-[0.6rem] tracking-tighter text-white">6. Avalanche (Trader Joe)</p></button>

                        </div>

                        <div className="text-center pt-2">
                            <button className="border bg-black p-2 hover:opacity-90" onClick={()=>{navigate('/trade')}}><p className="text-[0.8rem] text-white ">Launch app</p></button>
                        </div>



                    </div>
                </div>

                <div className="basis-5/12 px-8">
                    <img src={sectionImg} className="rounded-lg"></img>
                </div>

            </div>
        </>
    )
}