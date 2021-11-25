import React, { useEffect, useState } from "react";
import { useTranslator } from "./internationalization/translators";

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
        <div className="p-d-flex p-jc-between p-p-3">
            <div style={{ fontWeight: 500 }}>{t("Date")}:</div>
            <div>{dateString}</div>
        </div>
    );
}