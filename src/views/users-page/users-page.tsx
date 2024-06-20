import { FC, useState } from "react";
import { Header } from "../../layout/header";
import styles from "./styles.module.scss";
import { Button, DialogActions, Input, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Profile } from "../../components/profile";
import { UserPreview } from "../../components/user-preview";
import { getUsers, getUser, createUser } from "../../api/api.users";
import { useQuery } from "react-query";
import {UserAttributes} from '../../api/types'
import { CreateUserForm } from "../../components/create-user-form";
import { CreateUserData } from "../../components/create-user-form/types";

export const UsersPage: FC<any> = ({ tabs, role }) => {
    const { data: users } = useQuery("users", getUsers);

    const [currentUser, setCurrentUser] = useState<UserAttributes>();
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (CreateUserData: CreateUserData) => {
        createUser(CreateUserData.name,
            CreateUserData.birthday,
            CreateUserData.startWork,
            CreateUserData.telegram,
            CreateUserData.city,
            CreateUserData.email,
            CreateUserData.phoneNumber,
            CreateUserData.login,
            CreateUserData.role,
            CreateUserData.photo,
        );
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClick = async (id: number) => {
        const { data: user } = await getUser(id);
        setCurrentUser({ ...user });
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    }

    const filteredUsers = searchText
    ? users?.data.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : users?.data;

    return (
        <div className={styles.users}>
            <div className={styles.users_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.users_content}>
                    <div className={styles.users_aside}>
                        <Input value={searchText} onChange={handleSearchChange} placeholder="Поиск" />
                        <ul className={styles.users_list}>
                            {!!filteredUsers &&
                                filteredUsers.length !== 0 &&
                                filteredUsers.map(({ photo, name, id }) => (
                                    <li
                                        key={id}
                                        className={styles.users_item}
                                        onClick={() => handleClick(id)}
                                    >
                                        <UserPreview
                                            image={photo}
                                            text={name}
                                        />
                                    </li>
                                ))}
                        </ul> 
                        {(role === 'admin' || role === 'hr') && <Button variant="outlined" onClick={handleClickOpen}>Создать пользователя</Button>}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            fullWidth={true}
                        >
                            <DialogTitle>Создать пользователя</DialogTitle>
                            <DialogContent><CreateUserForm onSubmit={handleSubmit}/>
                            </DialogContent>

                            <DialogActions>
                            <Button onClick={handleClose}>Закрыть</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {!!currentUser && <Profile
                        id={currentUser.id}
                        email={currentUser.email}
                        phoneNumber={currentUser.phoneNumber}
                        telegram={currentUser.telegram}
                        name={currentUser.name}
                        startWork={currentUser.startWork} 
                        birthday={currentUser.birthday} 
                        city={currentUser.city} 
                        role={role}
                        photo={currentUser.photo}
                        />}
                </div>
            </div>
        </div>
    );
};