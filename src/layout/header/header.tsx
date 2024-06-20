import { FC, SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { LinkTab } from "../../components/link-tab/link-tab";
import { HeaderProps } from "./types";

import styles from "./styles.module.scss";

export const Header: FC<HeaderProps> = ({ tabs }) => {
    const currentUrl = window.location.pathname;
    const [value, setValue] = useState(currentUrl);

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box className={styles.header}>
            <Tabs
                value={value}
                onChange={handleChange}
                role="navigation"
                className={styles.header_tabs}
            >
                {!!tabs &&
                    tabs.map((tab, id) => {
                        return (
                            <LinkTab
                                key={id}
                                label={tab.label}
                                href={tab.link}
                                value={tab.link}
                            />
                        );
                    })}
            </Tabs>
        </Box>
    );
};
