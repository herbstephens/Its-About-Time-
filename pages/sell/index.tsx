import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import axios from "axios";
import cookies from "next-cookies";
import useAuth from "../../hooks/useAuth";
import { useAccount } from "wagmi";
import db from "../../utils/db";
import Link from "next/link";

const action = "login_action";
const signal = "my_signal";

export async function getServerSideProps(context: any) {
  console.log(cookies(context));
  const { address } = cookies(context);
  if (address) {
    const doc = await db.doc(`seller/${address}`).get();
    const seller = doc.data();
    console.log({ seller });
    return {
      props: {
        seller: seller || {},
      },
    };
  }
  return {};
}

export default function Home({ seller }: { seller?: any }) {
  console.log({ seller });
  const { address } = useAccount();
  const { setLoggedIn, isLoggedIn } = useAuth();
  console.log({ isLoggedIn, setLoggedIn });
  const onSuccess = async (result: ISuccessResult) => {
    console.log("sending: ", { action, signal, ...result });
    const res = await axios.post("/api/verify", {
      action,
      signal,
      ...result,
      address,
    });
    console.log("logging in");
    setLoggedIn(res.data === "Logged in");
    console.log(res.data === "Logged in", res.data);
    // do some logic to mark as logged in
  };

  const isKycd =
    (address && seller && seller.isVerified && address === seller.address) ||
    isLoggedIn;

  console.log({ address, seller });

  return !isKycd ? (
    <div>
      <IDKitWidget
        action="login_action"
        signal="my_signal"
        onSuccess={onSuccess}
        app_id="app_292d8587b41c6d6e97edb33aca080e3e"
        // walletConnectProjectId="get_this_from_walletconnect_portal"
      >
        {({ open }) => (
          <button disabled={!address} onClick={open}>
            {!address ? "Connect Wallet First" : "Verify with Worldcoin"}
          </button>
        )}
      </IDKitWidget>
    </div>
  ) : (
    <>
      <div>
        <Link href="/sell/dashboard">Check your pending orders</Link>
      </div>
      <div>
        <Link href="/sell/create">Create Profile</Link>
      </div>
    </>
  );
}
