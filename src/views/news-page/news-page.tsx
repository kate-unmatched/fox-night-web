import { FC } from "react";
import { Header } from "../../layout/header";

import styles from "./styles.module.scss";
import { Editable } from "../../components/editable";
import { UserPreview } from "../../components/user-preview";
import DefaultImage from "../../assets/default-image.jpg";
import { Button } from "@mui/material";

export const NewsPage: FC<any> = ({ tabs, role }) => {
    const canEdit = role === "admin" || role === "hr";
    const users = [
        { avatar: DefaultImage, text: "1.01.2001" },
        { avatar: DefaultImage, text: "1.01.2001" },
        { avatar: DefaultImage, text: "1.01.2001" },
    ];
    const links = [
        { link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", text: "link" },
        { link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", text: "link" },
        { link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", text: "link" },
    ];
    return (
        <div className={styles.news}>
            <div className={styles.news_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.news_content}>
                    <div className={styles.news_main}>
                        {canEdit && (
                            <Button
                                variant="outlined"
                                className={styles.news_button}
                            >
                                Создать пост
                            </Button>
                        )}
                        <Editable
                            initialValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                            type="textarea"
                            editable={canEdit}
                            className={styles.news_text}
                        />
                        {canEdit && (
                            <Button
                                variant="outlined"
                                className={styles.news_button}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                    <div className={styles.news_aside}>
                        <ul className={styles.news_list}>
                            {!!users &&
                                users.length !== 0 &&
                                users.map(({ avatar, text }) => (
                                    <li className={styles.news_item}>
                                        <UserPreview
                                            image={avatar}
                                            text={text}
                                        />
                                    </li>
                                ))}
                        </ul>
                        <ul className={styles.news_links}>
                            {!!links &&
                                links.length !== 0 &&
                                links.map(({ link, text }) => (
                                    <li className={styles.news_item}>
                                        <a href={link}>{text}</a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
