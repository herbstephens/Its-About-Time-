import { useRouter } from "next/router";
import { useContractWrite } from "wagmi";
import { aboutTimerAddress, useErc20Approve } from "../../generated";

const MAX_UINT256 =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export default function Page() {
  const { write } = useErc20Approve();
  return (
    <div>
      <h2>Create request</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write({
            args: [aboutTimerAddress[31337], MAX_UINT256],
          });
        }}
      >
        <label htmlFor="hours">Enter hours</label>
        <input type="number" id="hours" name="hours" />
        <div>
          <button type="submit">Send Request</button>
        </div>
      </form>
    </div>
  );
}
