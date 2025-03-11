import {Link, useParams} from "react-router-dom";
import makeStyles from "../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    drawer: {
        position: "fixed",
        top: "50px",
        left: "0",
        width: "200px",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRight: "1px solid lightgray",
        zIndex: 1000,
        padding: "20px",
        fontSize: "0.875rem",
        "& ul": {
            listStyle: "none",
            padding: 0,
            margin: 0
        },
        "& li": {
            marginBottom: "8px",
            padding: "3px 0px",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
            "&::marker": {
                content: "none"
            },
            "&:hover": {
                color: "white",
                backgroundColor: "#333"
            }

        },
        "& a": {
            cursor: "pointer",
            display: "block",
            textDecoration: "none",
            color: "var(--primary-color)",
            padding: "8px",
            borderRadius: "4px",

        }
    },
    activeLink: {
        backgroundColor: "lightgray",
    },
}));

interface Props {
    projectName: string
    currentVersion: string
}

const PageNavigation: React.FC<Props> = (props) => {

    const {projectName, currentVersion} = props;

    const {classes} = useStyles();

    const {version} = useParams<{ version: string }>();
    const basePath = `/${projectName}/${version || currentVersion}`;

    return (
        <div className={classes.drawer}>
            <ul>
                <li><Link to={`${basePath}/overview`}>Quick Overview</Link></li>
                <li><Link to={`${basePath}/information`}>01 - Important Information</Link></li>
                <li><Link to={`${basePath}/installation-guide`}>02 - Installation</Link></li>
                <li><Link to={`${basePath}/interface`}>03 - Interface</Link></li>
                <li><Link to={`${basePath}/globaldatalayer`}>04 - GlobalDataLayer</Link></li>
                <li><Link to={`${basePath}/uilayer`}>05 - UILayer</Link></li>
                <li><Link to={`${basePath}/content-area`}>06 - Content Area</Link></li>
                <li><Link to={`${basePath}/color-settings-and-dark-mode`}>07 - Color Settings and Dark Mode</Link></li>
                <li><Link to={`${basePath}/example-project`}>08 - Example Project</Link></li>
                <li><Link to={`${basePath}/playground`}>09 - Playground</Link></li>
            </ul>
            <h3>Need help?</h3>
            <ul>
                <li><Link to={`${basePath}/faq`}>FAQ</Link></li>
            </ul>
        </div>
    );
};

export default PageNavigation;
