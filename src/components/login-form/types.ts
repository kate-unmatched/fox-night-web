import { SubmitHandler } from "react-hook-form";

export type LoginFormProps = {
    onSubmit: SubmitHandler<LoginData>;
};

export type LoginData = {
    login: string;
    password: string;
};
