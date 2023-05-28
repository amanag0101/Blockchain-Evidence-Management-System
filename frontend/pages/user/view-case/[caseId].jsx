import Layout from "@/components/common/layout/Layout";
import ViewCase from "@/components/user/case/ViewCase";
import { useRouter } from "next/router";

export default function ViewCasePage() {
  const { caseId } = useRouter().query;

  return (
      <Layout children={<ViewCase caseId={caseId} />}></Layout>
  );
}
