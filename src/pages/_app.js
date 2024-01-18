import "@/styles/globals.css";
import "@/styles/responsive.css";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import SallState from "../../context/SallState";
const { provider } = configureChains(
    [bscTestnet],
    [
        alchemyProvider({ apiKey: process.env.Alchemy_Key }),
        // alchemyProvider({ apiKey: process.env.Alchemy_Key }),
        publicProvider(),
    ]
);

const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains: [bscTestnet],
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={[bscTestnet]}>
                <SallState>
                    <Component {...pageProps} />
                </SallState>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
