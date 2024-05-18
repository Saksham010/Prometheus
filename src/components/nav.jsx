import prometheusResized from "/prometheusresized.png";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./connect";
import { updateWallet,getWallet } from "../redux/walletSlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";


export default function Navbar(){

    const navigate = useNavigate();
    const walletState = useSelector(getWallet);

    console.log("Wallet State: ",walletState);


    return(
        <div className="basis-1/4">
            <div className=" max-w-8xl py-4 mx-auto flex justify-between">
                <div className="flex items-center  basis-1/2">
                    <div onClick={()=>{navigate('/')}}>
                        <img src={prometheusResized} width="80" height="80" className="rounded-full cursor-pointer" ></img>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-xl font-bold">Prometheus</h1>
                    </div>

                </div>

                <div className="basis-1/2 flex justify-end items-center">
                    <div><a href="/trade" className="pr-6 cursor-pointer hover:opacity-80 font-bold">Trade</a></div>
                    {/* <ConnectWallet/> */}
                    <button className="bg-black text-white py-2 px-4 hover:opacity-85"><h1 className="tracking-tighter">{walletState.connected? walletState.walletAddress:"Not Connected"}</h1></button>

                </div>            
            </div>
            <hr/>
        
        </div>
    )
}