import React, {useState} from "react";
import {GroupRoute} from "../page/pathRoute.ts";
import makeStyles from "../../../util/makeStyles.tsx";
import NavigationRoute from "./navigationRoute.tsx";
import {BLUE0} from "@iavofficial/frontend-framework/constants";

const useStyles = makeStyles(() => ({
    groupTitle: {
        width: "100%",
        cursor: "pointer",
        padding: "8px 0",
        marginBottom: "8px",
        display: "block",
        fontWeight: "bold",
        border: "none",
        "&:hover": {
            backgroundColor: BLUE0,
            color: "#fff",
        },
        borderRadius: "8px"
    },
    groupList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    groupItem: {
        paddingLeft: "16px",
    }
}));

interface Props {
    group: GroupRoute;
}

const NavGroupRoute: React.FC<Props> = ({group}) => {

    const {classes} = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className={classes.groupTitle} onClick={() => setIsOpen(!isOpen)}>
                {group.title}
            </button>
            {isOpen && (
                <NavigationRoute routes={group.routes}/>
            )}
        </div>
    );
};

export default NavGroupRoute;
