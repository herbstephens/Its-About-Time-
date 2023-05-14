import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { encodePacked } from "viem";

export default function Page() {
  const { address } = useAccount();
  const router = useRouter();
  return (
    <div>
      <h2>Describe Offering</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          console.log(formData.get("zkAddress"));
          const zkAddress = encodePacked(
            ["string"],
            [formData.get("zkAddress") as string]
          );
          const rate = Number(formData.get("rate") as string);
          const data = {
            ...Object.fromEntries(formData.entries()),
            address,
            zkAddress,
            rate,
          };
          console.log({ data });
          const response = await fetch("/api/seller", {
            method: "POST",
            body: JSON.stringify(data),
          });
          const json = await response.json();
          router.push("/sell/dashboard");
        }}
      >
        <div>
          <label htmlFor="rate">Set Hourly Rate</label>
          <input type="number" id="rate" name="rate" />
        </div>
        <div>
          <label htmlFor="jobTitle">Set Job Title</label>
          <input type="text" id="jobTitle" name="jobTitle" />
        </div>
        <div>
          <label htmlFor="zkAddress">Set zkAddress</label>
          <input type="text" id="zkAddress" name="zkAddress" />
        </div>
        <input type="hidden" name="address" value={address} />
        <div>
          <button type="submit">Create Offering</button>
        </div>
      </form>
    </div>
  );
}
