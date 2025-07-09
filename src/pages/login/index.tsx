import { AuthPage } from "@refinedev/antd"
import { authCredentials } from "../../providers"

export const Login = () => {
    return(
        <AuthPage 
            type="login"
            title="Welcome Back"
            formProps={{
                initialValues: authCredentials
            }}
        />
    )
}