import React from "react";
import makeStyles from "../../../../util/makeStyles.tsx";
import {BLUE3} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1.5em",
        borderRadius: "8px",
        overflow: "hidden",
    },
    thead: {
        backgroundColor: BLUE3,
        color: "#fff",
    },
    tbody: {
        backgroundColor: "#fff",
    },
    th: {
        border: "1px solid #dee2e6",
        padding: "10px",
        textAlign: "left",
    },
    td: {
        border: "1px solid #dee2e6",
        padding: "10px",
        textAlign: "left",
    },
}));

interface Props {
    data: Array<{
        key: string;
        value: string;
    }>;
}

const Table: React.FC<Props> = (props) => {

    const {data} = props;

    const {classes} = useStyles();

    return (
        <table className={classes.table}>
            <thead className={classes.thead}>
            <tr>
                <th className={classes.th}>Key</th>
                <th className={classes.th}>Value</th>
            </tr>
            </thead>
            <tbody className={classes.tbody}>
            {data.map((row, index) => (
                <tr key={index}>
                    <td className={classes.td}><strong>{row.key}</strong></td>
                    <td className={classes.td}>{row.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
