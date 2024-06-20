import { FC, useState, useEffect } from "react";
import EdiText from "react-editext";
import styles from "./styles.module.scss";
import { updateUser } from "../../api/api.users";

import { EditableProps } from "./types";
import { Typography } from "@mui/material";

export const Editable: FC<EditableProps> = ({
    id,
    initialValue,
    type,
    label,
    editable = false,
    className,
    field,
}) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setValue(initialValue)
    },[initialValue])
    const Months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const formatDateString = (date: Date): string => {
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = (val: string) => {
        if (type === "date") {
            const currentDate = new Date(val);
            const formattedDate = formatDateString(currentDate);
            val = `${currentDate.getDate()} ${Months[currentDate.getMonth()]}`;
            if (currentDate.toString() !== "Invalid Date") {
                setValue(val);
                if(id && field) updateUser(id, field, formattedDate);
            }
        } else if (field === 'email') {
            if (!validateEmail(val)) {
                setError('Некорректный email адрес');
            } else {
                setError(null);
                setValue(val);
                if(id && field) updateUser(id, field, val);
            }
        } else {
            setValue(val);
            if(id && field) updateUser(id, field, val)
        }
    };

    return (
        <div className={styles.editable}>
            {!!label && (
                <Typography className={styles.editable_text}>
                    {label}
                </Typography>
            )}
            <EdiText
                canEdit={editable}
                type={type}
                value={value}
                onSave={handleSave}
                editOnViewClick={true}
                editButtonClassName={styles.editable_button}
                viewContainerClassName={className}
            />
            {error && <Typography className={styles.error_text}>{error}</Typography>}
        </div>
    );
};
