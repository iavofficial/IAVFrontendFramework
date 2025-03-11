import React, {HTMLAttributeAnchorTarget} from "react";
import {Link} from "react-router-dom";
import makeStyles from "../../../../util/makeStyles.tsx";
import {BLUE3} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: BLUE3,
        borderRadius: "4px",
        transition: "background-color 0.3s ease",
        display: "inline-block",
        "&:hover": {
            textDecoration: "underline",
        }
    },
}));

interface Props {
    to: string;
    label: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    className?: string;
}

const PageLink: React.FC<Props> = (props) => {

    const {to, className, label, target} = props;

    const {classes} = useStyles();

    return (
        <Link
            target={target}
            to={to}
            className={`${classes.link} ${className ? className : ""}`}>
            {label}
        </Link>
    );
};

export default PageLink;
