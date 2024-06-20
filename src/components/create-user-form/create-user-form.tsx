import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { CreateUserData, CreateUserFormProps } from "./types";
import { Button, TextField, Select, MenuItem, FormControl, Input} from "@mui/material";

import styles from "./styles.module.scss";
export const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<CreateUserData>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue("photo", file);
        }
    };
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Имя"
                        type="text"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="День рождения"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("birthday", { required: true })}
                    />
                    {errors.birthday && <span>{errors.birthday.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Начало работы"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("startWork", { required: true })}
                    />
                    {errors.startWork && <span>{errors.startWork.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Телеграм"
                        type="text"
                        {...register("telegram", { required: true })}
                    />
                    {errors.telegram && <span>{errors.telegram.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Город"
                        type="text"
                        {...register("city", { required: true })}
                    />
                    {errors.city && <span>{errors.city.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Почта"
                        type="text"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Номер"
                        type="text"
                        {...register("phoneNumber", { required: true })}
                    />
                    {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <TextField
                        variant="filled"
                        label="Логин"
                        type="text"
                        {...register("login", { required: true })}
                    />
                    {errors.login && <span>{errors.login.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <FormControl>
                        <Controller
                            name="role"
                            control={control}
                            defaultValue="EMPLOYEE"
                            rules={{ required: "Роль обязательна" }}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value="ADMIN">Админ</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="EMPLOYEE">Сотрудник</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    {errors.role && <span>{errors.role.message}</span>}
                </div>
                <div className={styles.form_field}>
                    <Input
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        onChange={handleFileChange}
                    />
                    {errors.photo && <span>{errors.photo.message}</span>}
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    className={styles.form_button}
                >
                    Создать
                </Button>
            </form>
        </div>
    );
};
