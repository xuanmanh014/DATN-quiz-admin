import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const LayoutContent = () => {
    return (
        <Layout.Content
            style={{
                padding: "16px",
                width: "100%",
                height: "100%"
            }}
        >
            <div style={{ background: "#fff", padding: "16px", width: "100%", height: "100%", borderRadius: 10 }}>
                <Outlet />
            </div>
        </Layout.Content>
    )
}

export default LayoutContent