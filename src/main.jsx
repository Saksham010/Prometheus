import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store';
import { Provider } from 'react-redux';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import './index.css';
import Home from './routes/home';
import Trade from "./routes/trade";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Wagmi configuration
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId:'37759cb0ed828d2d9f964fa4b5d36439',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:'/trade',
    element:<Trade/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </RainbowKitProvider>
  </WagmiConfig>,
)
