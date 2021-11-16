import { NextPage } from "../../data";
import Link from "next/dist/client/link";

const Profile: NextPage = () => {
  return (
    <div>
      Company Profile
      <br />
      <Link href="/company">Home</Link>
      <br />
    </div>
  );
};

export default Profile;
