import Layout from "@/components/common/layout/Layout";
import ViewCase from "@/components/user/case/ViewCase";

export default function ViewCasePage() {
  return (
    <>
      <Layout children={<ViewCase />}></Layout>
    </>
  );
}
