import React from "react";
import makeStyles from "../../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    image: {
        width: "100%",
        height: "auto",
        marginBottom: "16px"
    },
}));

interface Props {
    src: string;
    alt?: string;
    className?: string;
    fromGhPages?: boolean;
}

const Image: React.FC<Props> = (props) => {

    const {src, alt, className, fromGhPages} = props;

    const {classes} = useStyles();

    return (
        <img
            src={fromGhPages ? `https://iavofficial.github.io/IAVFrontendFramework/${src}` : src}
            alt={alt}
            className={`${classes.image} ${className ? className : ""}`}
        />
    );
};

export default Image;
