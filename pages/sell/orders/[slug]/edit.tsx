import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h2>Start your Clock for {router.query.slug} </h2>
      <button>Start</button>
      <button>Stop</button>
    </div>
  );
}
