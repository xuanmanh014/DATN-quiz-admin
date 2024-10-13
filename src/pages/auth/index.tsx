import { Button, Col, Form, Row } from "antd"
import { AuthApis } from "../../apis/auth/index.api"
import FormItemInput from "../../components/custom/form/FormItemInput"
import banner from "../../assets/banner.jpeg"
import FormItemPassword from "../../components/custom/form/FormItemPassword"
import { useAppContext } from "../../contexts/app"
import { commonPlaceholderInput, validateMessage } from "../../utils"

const AuthPage = () => {
    const { openNotiError, openNotiSuccess, setLoading } = useAppContext();

    const onFinish = (values: any) => {
        setLoading(true);
        AuthApis.login(values).then((response) => {
            openNotiSuccess("Login");
            localStorage.setItem("AccessToken", response);
            window.location.href = "/quiz";
        }).catch((error) => {
            const { response } = error;
            openNotiError("Login", response?.data?.message);
        }).finally(() => setLoading(false));
    }

    return (
        <Row className="w-full h-[100vh]">
            <Col span={18}>
                <img src={banner} alt="Auth page's banner" style={{ width: "100%", objectFit: "cover", height: "100%" }} />
            </Col>
            <Col span={6} style={{ padding: 20 }}>
                <h1 className="mb-5">Login</h1>
                <Form onFinish={onFinish} layout="vertical">
                    <FormItemInput
                        label={"Email"}
                        name={"email"}
                        inputProps={{
                            placeholder: commonPlaceholderInput("email")
                        }}
                        rules={[
                            { required: true, message: validateMessage("email") }
                        ]}
                    />
                    <FormItemPassword
                        label={"Mật khẩu"}
                        name={"password"}
                        inputProps={{
                            placeholder: commonPlaceholderInput("password")
                        }}
                        rules={[
                            { required: true, message: validateMessage("password") }
                        ]}
                    />
                    <Button
                        htmlType="submit"
                        block
                        size="large"
                        type="primary"
                        style={{ height: 50, marginTop: 20 }}
                    >
                        Login
                    </Button>
                </Form>

            </Col>
        </Row>
    )
}

export default AuthPage