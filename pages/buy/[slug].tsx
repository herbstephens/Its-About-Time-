import db from "../../utils/db";
import { useAccount, useSignMessage } from "wagmi";
import {
  aboutTimerAddress,
  useErc20Approve,
  useErc20Read,
} from "../../generated";
import { parseEther } from "viem";
import axios from "axios";

const MAX_UINT256 =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const doc = await db.doc(`seller/${slug}`).get();
  const profile = {
    ...doc.data(),
    _id: doc.id,
  };

  return {
    props: {
      profile,
    },
  };
}

export default function Page({ profile }: any) {
  const { address } = useAccount();
  const { write } = useErc20Approve();
  const { data: allowance } = useErc20Read({
    functionName: "allowance",
    args: [address as `0x${string}`, aboutTimerAddress[137]],
  });
  const { signMessageAsync } = useSignMessage();
  console.log({ allowance });
  const needsToApprove = allowance?.toString() === "0";
  return (
    <div>
      <h2>Create request</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const maxHours = e.currentTarget.hours.value;
          const weiProfileRate = parseEther(profile.rate.toString());
          const signedMessage = await signMessageAsync({
            message: `I agree to order from ${profile.address} for a max of ${maxHours} hours at a rate of ${weiProfileRate} and acknowledge I have read the terms and conditions of It's About Time!`,
          });
          axios.post("/api/order", {
            buyer: address,
            hours: Number(maxHours),
            rate: profile.rate,
            seller: profile.address,
            signedMessage,
            status: "pending",
            zkAddress: profile.zkAddress,
          });
        }}
      >
        <label htmlFor="hours">Enter hours</label>
        <input type="number" id="hours" name="hours" />
        <div>
          <button
            type="button"
            onClick={() => {
              write({
                args: [aboutTimerAddress[137], MAX_UINT256],
              });
            }}
          >
            Approve BOB for It's About Time
          </button>
          <button disabled={needsToApprove} type="submit">
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
}
