import { Layout, Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';

const LayoutSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
        { key: "/quiz", label: "Quiz" },
        { key: "/topic", label: "Topic" },
    ];

    const onClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
        navigate(key);
    }

    return (
        <Layout.Sider
            theme='light'
            width={280}
        >
            <Menu
                items={items}
                onClick={onClick}
                defaultSelectedKeys={[pathname]}
                style={{ border: "none" }}
            />
        </Layout.Sider>
    )
}

export default LayoutSidebar