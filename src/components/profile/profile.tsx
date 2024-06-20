import { FC } from "react";
import styles from "./styles.module.scss";
import ImageUploader from "../../components/image-uploader";
import { Editable } from "../editable";
import { Typography, Button } from "@mui/material";
import { ProfileProps } from "./types"
import { deleteUser } from "../../api/api.users";
import AuthStore from "../../store/store.ts";

export const Profile: FC<ProfileProps> = ({ role, 
    id,
    name,
    birthday,
    startWork,
    telegram,
    city,
    email,
    phoneNumber,
    photo,
}) => {
    const hrEdit = role === "hr" || role === "admin";
    const userEdit = role === "hr" || role === "admin" || role === "employee";

const currentUserId = AuthStore.getUserId;

    const handleDelete = (id: number) => {
        deleteUser(id);
    }

    const handleLogout = () => {
        AuthStore.logout()
    }
    
    return (
        <div className={styles.profile}>
            <div className={styles.profile_head}>
                <ImageUploader className={styles.profile_image} photo={photo} id={id}></ImageUploader>
                <div className={styles.profile_user}>
                    <Editable id={id} initialValue={name} type="text" field={'name'}/>
                    <Typography>работает с {startWork}</Typography>
                </div>
            </div>
            <div className={styles.prifle_fields}>
                <Editable
                    id={id}
                    initialValue={telegram}
                    type="text"
                    label={"Телеграм"}
                    editable={userEdit}
                    field={'telegram'}
                />
                <Editable
                    id={id}
                    initialValue={email}
                    type="text"
                    label={"Почта"}
                    editable={hrEdit}
                    field={'email'}
                />
                <Editable
                    id={id}
                    initialValue={phoneNumber}
                    type="text"
                    label={"Номер"}
                    editable={userEdit}
                    field={'phoneNumber'}
                />
                <Editable
                    id={id}
                    initialValue={birthday}
                    type="date"
                    label={"День рождения"}
                    editable={hrEdit}
                    field={'birthday'}
                />
                <Editable
                    id={id}
                    initialValue={city}
                    type="text"
                    label={"Город"}
                    editable={hrEdit}
                    field={'city'}
                />
            </div>
            {role === 'admin' && <Button onClick={()=> handleDelete(id)}>{'Удалить пользователя'}</Button>}
            {currentUserId === id && <Button onClick={handleLogout}>{'Выйти'}</Button>}
        </div>
    );
};
