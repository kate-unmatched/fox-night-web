import { FC } from "react";
import Tab from "@mui/material/Tab";
import { LinkTabProps } from "./types";

export const LinkTab: FC<LinkTabProps> = ({ label, href, value }) => {
    return (
        <Tab
            component="a"
            aria-current={"page"}
            label={label}
            href={href}
            value={value}
        />
    );
};
