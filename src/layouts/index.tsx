import { Layout } from "antd"
import LayoutSidebar from "./sidebar"
import LayoutHeader from "./header"
import LayoutContent from "./content"

const RootLayout = () => {
    return (
        <Layout style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden"
        }}>
            <LayoutSidebar />

            <Layout>
                <LayoutHeader />
                <LayoutContent />
            </Layout>
        </Layout>
    )
}

export default RootLayout