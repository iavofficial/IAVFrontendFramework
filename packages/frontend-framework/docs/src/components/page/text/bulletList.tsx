import React from "react";
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";

const useStyles = makeStyles(({showBullets}) => ({
    list: {
        listStyleType: showBullets ? "disc" : "none",
        padding: 0,
        margin: 0,
        paddingLeft: showBullets ? "40px" : 0,
    },
    listItem: {
        marginBottom: "8px",
        lineHeight: "26px",
    },
}));

interface Props {
    items: string[];
    showBullets?: boolean;
}

const BulletList: React.FC<Props> = (props) => {

    const {items, showBullets} = props;

    const {classes} = useStyles({showBullets});

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
