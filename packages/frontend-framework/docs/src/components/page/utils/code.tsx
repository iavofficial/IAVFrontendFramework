import React, {PropsWithChildren} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";
import {ocean} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {GREY2} from "../../../../../src/constants.ts";

const useStyles = makeStyles(() => ({
    codeBlock: {
        width: "100%",
        padding: "2px",
        borderRadius: "8px",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        background: "#2b303b",
        paddingLeft: "8px",
        margin: "8px 0"
    },
    title: {
        padding: "2px 0",
        color: GREY2,
        fontSize: "0.8rem",
        fontWeight: "bold",
    }
}));

interface Props {
    language: string;
    title?: string;  // Optional title
}

const Code: React.FC<PropsWithChildren<Props>> = (props) => {

    const {language, children, title} = props;

    const {classes} = useStyles();

    return (
        <div className={classes.codeBlock}>
            {title && <div className={classes.title}>{title}</div>}
            <SyntaxHighlighter language={language} style={ocean}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;
