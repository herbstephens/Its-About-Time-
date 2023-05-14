import Image from "next/image";
import Link from "next/link";

export interface ProfileProps {
  address: `0x${string}`;
  jobTitle: string;
  rate: number;
}

export default function Profile(props: ProfileProps) {
  const { address, jobTitle, rate } = props;
  return (
    <div style={{ display: "flex", border: "gray solid 1px" }}>
      <div>
        <p>Seller: {address}</p>
        <p>Job Title: {jobTitle}</p>
        <p>Rate: {rate} BOB / hour</p>
      </div>
      <div>
        <Link href={`/buy/${address}`}>Send request</Link>
      </div>
    </div>
  );
}
