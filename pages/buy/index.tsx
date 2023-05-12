import type { NextPage } from "next";
import Profile, { ProfileProps } from "../../components/Profile";

const mockProfiles: ProfileProps[] = [
  {
    name: "Alice",
    picture: "https://avatars.githubusercontent.com/u/263385",
    rateInUSD: 100,
    address: "0x39C3b20BE76b3B39A9CD583544aE59C6A2759045",
  },
  {
    name: "Bob",
    picture: "https://avatars.githubusercontent.com/u/263385",
    rateInUSD: 100,
    address: "0x39C3b20BE76b3B39A9CD583544aE59C6A2759035",
  },
];

const BuyPage: NextPage = () => {
  return (
    <div>
      <h1>Offers</h1>
      {mockProfiles.map((profile) => (
        <Profile key={profile.address} {...profile} />
      ))}
    </div>
  );
};

export default BuyPage;
