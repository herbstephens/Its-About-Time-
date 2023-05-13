import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import Link from "next/link";

export default function Home() {
  const handleProof = useCallback((result: ISuccessResult) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
      // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  }, []);

  const onSuccess = (result: ISuccessResult) => {
    console.log(result);
  };

  return (
    <div>
      {/* <IDKitWidget
        action="my_action"
        signal="my_signal"
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id="app_staging_d647421f80837ac47dab2f90ff0017be"
        // walletConnectProjectId="get_this_from_walletconnect_portal"
      >
        {({ open }) => <button onClick={open}>Sign in with World Id</button>}
      </IDKitWidget> */}
      <Link href="/sell/orders/1/edit">Order 1</Link>
    </div>
  );
}
