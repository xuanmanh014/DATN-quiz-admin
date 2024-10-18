import { Button, Form } from "antd"
import { AuthApis } from "../../apis/auth/index.api"
import FormItemInput from "../../components/custom/form/FormItemInput"
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
        <div className="auth__form-wrapper">
            <div className="auth__form">
                <h1>Login</h1>
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
                        label={"Password"}
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
            </div>
        </div>
    )
}

export default AuthPage