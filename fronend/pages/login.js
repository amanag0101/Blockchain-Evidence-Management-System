import Layout from "@/components/common/layout/Layout";
import Login from "@/components/public/authentication/login/Login";

export default function LoginPage() {
    return (
        <>
            <Layout children={ <Login /> }></Layout>
        </>
    );
}