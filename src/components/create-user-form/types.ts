import { SubmitHandler } from "react-hook-form";

export type CreateUserFormProps = {
    onSubmit: SubmitHandler<CreateUserData>;
};

export type CreateUserData = {
    name: string,
    birthday: string,
    startWork: string,
    telegram: string,
    city: string,
    email: string,
    phoneNumber: string,
    login: string,
    role: string,
    photo: File
};