import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import axios from "axios";
import cookies from "next-cookies";
import useAuth from "../../hooks/useAuth";
import { useAccount } from "wagmi";
import db from "../../utils/db";

const action = "login_action";
const signal = "my_signal";

export async function getServerSideProps(context: any) {
  console.log(cookies(context));
  const { address } = cookies(context);
  if (address) {
    const doc = await db.doc(`seller/${address}`).get();
    const seller = doc.data();
    return {
      props: {
        seller,
      },
    };
  }
  return {};
}

export default function Home({ seller }: { seller: any }) {
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

  return (
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
      {/* {/* <Link href="/sell/orders/1/edit">Order 1</Link> */}
      {/* <h2>Create An Offer To Sell Your Time.</h2>
      <Link href={"/sell/create"}>Create Offering</Link> */}
    </div>
  );
}
