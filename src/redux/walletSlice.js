import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    chainId:'0x1',
    chainName:'Ethereum',
    walletAddress:'0x11',
    connected:false,
  },
  reducers: {
    updateWallet: (state,action) =>{
      state.chainId = action.payload.chainId;
      state.chainName = action.payload.chainName;
      state.walletAddress = action.payload.walletAddress;
      state.connected = action.payload.connected;
    }
  }
})

export const { updateWallet} = walletSlice.actions

//Selector
export const getWallet = (state) => state.wallet;

export default walletSlice.reducer

