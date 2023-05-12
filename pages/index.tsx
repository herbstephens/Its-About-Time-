import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import Link from "next/link";

const Home: NextPage = () => {
  const { address } = useAccount();
  return (
    <div>
      <Head>
        <title>Proof your time</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <h1>Proof your time</h1>
      <ConnectButton />
      {address && (
        <div>
          <div>
            <Link href="buy">Buy time</Link>
          </div>
          <div>
            <Link href="sell">Sell time</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
