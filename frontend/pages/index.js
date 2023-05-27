import Layout from "@/components/common/layout/Layout";
import UserHome from "@/components/user/home/Home";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Homepage() {
  return <Layout children={<UserHome />} />;
}
