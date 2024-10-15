import { Avatar, Dropdown, Flex, Layout, MenuProps } from 'antd'
import { useAppContext } from '../../contexts/app';
import { handleLogout } from '../../apis/auth/index.api';

const LayoutHeader = () => {
    const { breadCrumb } = useAppContext();
    const items: MenuProps["items"] = [
        { type: "divider" },
        { key: "logout", label: "Đăng xuất", danger: true },
    ];

    const onClick: MenuProps["onClick"] = ({ key }: { key: string }) => {
        switch (key) {
            case "logout":
                handleLogout();
                break;

            default:
                break;
        }
    }

    return (
        <Layout.Header
            style={{
                backgroundColor: "#fff",
                padding: "0 20px"
            }}
        >
            <Flex
                align="center"
                justify="space-between"
                style={{ height: "100%" }}
            >
                <h1 style={{ fontSize: 18 }}>{breadCrumb}</h1>
                <Dropdown
                    menu={{
                        items,
                        onClick
                    }}
                    destroyPopupOnHide
                    placement="bottomRight"
                    trigger={["click"]}
                >
                    <div style={{ cursor: "pointer" }}>
                        <Avatar>
                            A
                        </Avatar>
                    </div>
                </Dropdown>
            </Flex>
        </Layout.Header>
    )
}

export default LayoutHeader