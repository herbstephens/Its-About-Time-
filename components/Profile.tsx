import Image from "next/image";
import Link from "next/link";

export interface ProfileProps {
  name: string;
  picture: string;
  rateInUSD: number;
  address: `0x${string}`;
}

export default function Profile(props: ProfileProps) {
  const { name, picture, rateInUSD, address } = props;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Image src={picture} alt={name} width={100} height={100} />
      </div>
      <div>
        <h2>{name}</h2>
        <p>{address}</p>
        <p>{rateInUSD} USD / hour</p>
      </div>
      <div>
        <Link href={`/buy/${address}`}>Send request</Link>
      </div>
    </div>
  );
}
