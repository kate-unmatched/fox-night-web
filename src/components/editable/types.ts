import { EdiTextType } from "react-editext";

export type EditableProps = {
    id?: number;
    initialValue: string;
    type: EdiTextType;
    label?: string;
    editable?: boolean;
    className?: string;
    field?: string;
};
