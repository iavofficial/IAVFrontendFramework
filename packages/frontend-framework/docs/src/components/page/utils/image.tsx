import React from "react";
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";

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
}

const Image: React.FC<Props> = (props) => {

    const {src, alt, className} = props;

    const {classes} = useStyles();

    return (
        <img
            src={src}
            alt={alt}
            className={`${classes.image} ${className ? className : ""}`}
        />
    );
};

export default Image;
