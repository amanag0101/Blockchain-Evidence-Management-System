import Layout from "@/components/common/layout/Layout";
import Register from "@/components/public/authentication/register/Register";

export default function RegisterPage() {
  return <Layout children={<Register />} />;
}
