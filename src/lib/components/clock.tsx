import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../contexts/language";
import { useTranslation } from "./internationalization/internationalization_hooks";

interface State {
    date: Date;
}

export const Clock = () => {
    const t = useTranslation();
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