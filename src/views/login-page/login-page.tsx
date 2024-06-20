import { FC } from "react";
import { LoginForm } from "../../components/login-form";
import { LoginData } from "../../components/login-form/types";
import { observer } from "mobx-react-lite";
import AuthStore from "../../store/store.ts";

import styles from "./styles.module.scss";

export const LoginPage: FC = observer(() => {
    const handleSubmit = (loginData: LoginData) => {
        AuthStore.login(loginData.login, loginData.password);
    };
    return (
        <div className={styles.login}>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
});
