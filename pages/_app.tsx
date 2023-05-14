import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  foundry,
  goerli,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Link from "next/link";
import AuthProvider from "../components/AuthProvider";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    foundry,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <div style={{ display: "flex" }}>
            <Link href="/">Home</Link>
            <ConnectButton />
          </div>
          <Component {...pageProps} />
          <footer>It's About Time!</footer>
        </RainbowKitProvider>
      </WagmiConfig>
    </AuthProvider>
  );
}

export default MyApp;
