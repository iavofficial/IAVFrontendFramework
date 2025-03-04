import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import makeStyles from "../../../../../src/components/content/style_options/makeStyles.tsx";
import {ocean} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const useStyles = makeStyles(() => ({
    codeBlock: {
        width: "100%",
        padding: "2px",
        borderRadius: "8px",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        background: "#2b303b"
    },
}));

interface Props {
    language: string;
    children: string;
}

const Code: React.FC<Props> = (props) => {

    const {language, children} = props;

    const {classes} = useStyles();

    return (
        <div className={classes.codeBlock}>
            <SyntaxHighlighter language={language} style={ocean}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;
