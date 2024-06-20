import { FC } from "react";
import { useForm } from "react-hook-form";
import { LoginData, LoginFormProps } from "./types";
import { Button, TextField } from "@mui/material";

import styles from "./styles.module.scss";
export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_field}>
                    <TextField
                        variant="outlined"
                        label="логин"
                        type="text"
                        {...register("login", { required: true })}
                    />
                    {errors.login && <span>{errors.login.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="outlined"
                        label="пароль"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    className={styles.form_button}
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};
