import { NextPage } from "next/types";
import Link from "next/link";
import { axiosInstance } from "../../lib";

const Dashboard: NextPage = () => {
  const getData = async () => {
    try {
      let { data } = await axiosInstance.get("/company/profile");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Company Dashboard
      <button onClick={getData}>Access secrets</button>
      <br />
      <Link href="/company/profile">Profile</Link>
      <br />
      <Link href="/logout">Logout</Link>
    </div>
  );
};

export default Dashboard;
