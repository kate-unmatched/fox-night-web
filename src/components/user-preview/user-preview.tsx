import { FC } from "react";

import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import classNames from "classnames";
import { UserPreviewProps } from "./types";

export const UserPreview: FC<UserPreviewProps> = ({
    image,
    text,
    className,
}) => {
    const transformPath = (path: string) => {
        const urlPath = path.replace(/\\/g, '/').replace('C:/employee_pictures/', 'http://localhost:8084/employee_pictures/');
        return urlPath;
    };

    const imageUrl = image ? transformPath(image) : image ;

    return (
        <div className={classNames(className, styles.user)}>
            <img src={imageUrl} alt="Avatar" className={styles.user_avatar} />
            {!!text && (
                <Typography className={styles.user_text}>{text}</Typography>
            )}
        </div>
    );
};
