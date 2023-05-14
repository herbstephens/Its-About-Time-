import { useRouter } from "next/router";
import { useAccount } from "wagmi";

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
          const data = { ...Object.fromEntries(formData.entries()), address };
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
        <input type="hidden" name="address" value={address} />
        <div>
          <button type="submit">Create Offering</button>
        </div>
      </form>
    </div>
  );
}
