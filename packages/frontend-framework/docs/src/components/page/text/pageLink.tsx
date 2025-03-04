import React from "react";
import {Link} from "react-router-dom";
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "var(--primary-color)",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "4px",
        transition: "background-color 0.3s ease",
        display: "inline-block",
        "&:hover": {
            backgroundColor: "#f0f0f0",
        },
    },
    activeLink: {
        backgroundColor: "#e0e0e0",
    },
}));

interface Props {
    to: string;
    label: string;
    className?: string;
}

const PageLink: React.FC<Props> = (props) => {

    const {to, className, label} = props;

    const {classes} = useStyles();

    return (
        <Link
            to={to}
            className={`${classes.link} ${className ? className : ""}`}>
            {label}
        </Link>
    );
};

export default PageLink;
