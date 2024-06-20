import { FC, useEffect, useState } from "react";
import { Header } from "../../layout/header";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "./styles.module.scss";
import { useQuery } from "react-query";
import { getAudit } from "../../api/api.users";
import { AuditAttributes } from "../../api/types";

export const AuditPage: FC<any> = ({ tabs, role }) => {

    const { data: audit } = useQuery("audit", getAudit);

    useEffect(() => {
        if (audit) setRowData(audit.data) ;
    }, [audit])
    const [rowData, setRowData] = useState<AuditAttributes[]>([
        {
            name: "Иванов Иван Иванович",
            requestTime: "01.01.2001",
            requestType: "действие",
            role: 'role',
            body: "????????????",
        },
        {
            name: "Иванов Иван Иванович",
            requestTime: "01.01.2001",
            requestType: "действие",
            role: 'role',
            body: "????????????",
        },
        {
            name: "Иванов Иван Иванович",
            requestTime: "01.01.2001",
            requestType: "действие",
            role: 'role',
            body: "????????????",
        },
    ]);

    const [colDefs, setColDefs] = useState<
        (ColDef<any, any> | ColGroupDef<any>)[]
    >([
        {
            field: "name",
            headerName: "Кто",
        },
        {
            field: "requestTime",
            headerName: "Когда",
        },
        {
            field: "requestType",
            headerName: "Действие",
        },
        {
            field: "role",
            headerName: "Роль",
        },
        {
            field: "body",
            headerName: "json",
        },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    return (
        <div className={styles.audit}>
            <div className={styles.audit_wrapper}>
                <Header tabs={tabs} />
                <div className={styles.audit_content}>
                    <div className="ag-theme-quartz" style={{ height: "100%" }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
