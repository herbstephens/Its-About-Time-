import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h2>Create request</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/buy/orders/123`);
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
