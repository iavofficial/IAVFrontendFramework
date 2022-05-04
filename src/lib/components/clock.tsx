import React, { useEffect, useState } from "react";
import { useTranslator } from "./internationalization/translators";
import { BLUE2 } from "../constants";

export const Clock = () => {
    const t = useTranslator();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDate(new Date()), 1000);
    }, [])

    const dateString = date.toLocaleDateString("de-DE", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="p-d-flex p-jc-between p-pl-3 p-pr-3 p-pb-2">
            <div style={{ fontWeight: 500 }}>{t("Date")}:</div>
            <div style={{ color: BLUE2 }}>{dateString}</div>
        </div>
    );
}