import Link from "next/link";
import { useRouter } from "next/router";

interface Order {
  id: string;
  hours: number;
  status: "pending" | "accepted" | "rejected";
  sellerAddress: string;
  buyerAddress: string;
}

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h2>Order {slug}</h2>
      <p>Hours: 10</p>
      <p>Status: pending</p>
      <p>Seller: 0x39C3b20BE76b3B39A9CD583544aE59C6A2759045</p>
      <Link href={`/sell/orders/${slug}/edit`}>Edit</Link>
    </div>
  );
}
