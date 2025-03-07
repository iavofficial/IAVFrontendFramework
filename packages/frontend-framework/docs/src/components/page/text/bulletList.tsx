import React from "react";
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";

const useStyles = makeStyles(({bulletType}) => ({
    list: {
        listStyleType: bulletType === "bullet" ? "disc" : bulletType === "number" ? "decimal" : "none",
        padding: 0,
        margin: 0,
        paddingLeft: bulletType ? "40px" : 0,
    },
    listItem: {
        marginBottom: "8px",
        lineHeight: "26px",
    },
}));

interface Props {
    items: string[];
    bulletType?: "bullet" | "number";
}

const BulletList: React.FC<Props> = (props) => {

    const {items, bulletType} = props;

    const {classes} = useStyles({bulletType});

    return (
        <ul className={classes.list}>
            {items.map((item, index) => (
                <li key={index} className={classes.listItem}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default BulletList;
