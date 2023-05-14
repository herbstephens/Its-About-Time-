import type { NextPage } from "next";
import db from "../../utils/db";
import Profile, { ProfileProps } from "../../components/Profile";

export async function getServerSideProps() {
  // rate is not null
  const collection = await db.collection(`seller`).where("rate", ">", 0).get();
  const profiles = collection.docs.map((doc) => ({
    ...doc.data(),
    _id: doc.id,
  }));

  return {
    props: {
      profiles,
    },
  };
}

const BuyPage: NextPage = ({ profiles }: any) => {
  return (
    <div>
      <h1>Sellers</h1>
      {profiles.map((profile: ProfileProps) => (
        <Profile key={profile.address} {...profile} />
      ))}
    </div>
  );
};

export default BuyPage;
