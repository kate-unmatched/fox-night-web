import { FC, useState, useEffect } from "react";
import { Header } from "../../layout/header";

import styles from "./styles.module.scss";
import { Profile } from "../../components/profile";
import {UserAttributes} from '../../api/types'
import { getUser } from "../../api/api.users";

export const ProfilePage: FC<any> = ({ tabs, role, id }) => {
    const [currentUser, setCurrentUser] = useState<UserAttributes>();

    useEffect(() => {
        const updateUser = async () => {
            const { data: user } = await getUser(id);
            setCurrentUser({ ...user });
        }
        updateUser();
    }, [id])


    return (
        <div className={styles.profile}>
            <div className={styles.profile_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.profile_content}>
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
