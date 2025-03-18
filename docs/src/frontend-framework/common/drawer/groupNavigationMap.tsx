import React, {useState} from "react";
import makeStyles from "../../../util/makeStyles.tsx";
import NavigationMap from "./navigationMap.tsx";
import {BLUE0} from "../../../constants.ts";
import {GroupRoute} from "../page/pathRoute.ts";

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
        borderRadius: "8px",
    },
    groupList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    groupItem: {
        paddingLeft: "16px",
    },
}));

interface Props {
    groups: GroupRoute[];
}

const GroupNavigationMap: React.FC<Props> = (props) => {
    const {groups} = props;
    const {classes} = useStyles();

    const [openGroups, setOpenGroups] = useState<string[]>([]);

    const toggleGroup = (title: string) => {
        setOpenGroups(prev => {
            if (prev.includes(title)) {
                return prev.filter(group => group !== title);
            } else {
                return [...prev, title];
            }
        });
    };

    return (
        groups.map((group) => {
            const isOpen = openGroups.includes(group.title);

            return (
                <div key={group.title}>
                    <button
                        className={classes.groupTitle}
                        onClick={() => toggleGroup(group.title)}
                    >
                        {group.title}
                    </button>
                    {isOpen && <NavigationMap routes={group.routes}/>}
                </div>
            );
        })
    );
};

export default GroupNavigationMap;
