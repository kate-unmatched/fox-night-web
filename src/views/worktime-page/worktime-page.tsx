import { FC, useState } from "react";
import { Header } from "../../layout/header";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

export const WorktimePage: FC<any> = ({ tabs, role }) => {
    const [rowData, setRowData] = useState<any[]>([
        {
            monday: "8h",
            tuesday: "8h",
            wednesday: "8h",
            thursday: "8h",
            friday: "8h",
            saturday: "8h",
            sunday: "8h",
        },
    ]);

    const [colDefs, setColDefs] = useState<
        (ColDef<any, any> | ColGroupDef<any>)[]
    >([
        {
            field: "monday",
            headerName: "01.01.2024",
            editable: true,
        },
        {
            field: "tuesday",
            headerName: "02.01.2024",
            editable: true,
        },
        {
            field: "wednesday",
            headerName: "03.01.2024",
            editable: true,
        },
        {
            field: "thursday",
            headerName: "04.01.2024",
            editable: true,
        },
        {
            field: "friday",
            headerName: "05.01.2024",
            editable: true,
        },
        {
            field: "saturday",
            headerName: "06.01.2024",
            editable: true,
        },
        {
            field: "sunday",
            headerName: "07.01.2024",
            editable: true,
        },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    return (
        <div className={styles.worktime}>
            <div className={styles.worktime_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.worktime_content}>
                    <div className="ag-theme-quartz" style={{ height: 93 }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                    <div className={styles.worktime_button}>
                        <Button variant="outlined">Отправить</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
