import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

import { TranslateFunctionType } from "../../../contexts/language";
import { useTranslation } from "../../internationalization/internationalization_hooks";

interface Props {
    name: string | ((t: TranslateFunctionType) => string);
    logo: string
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const t = useTranslation();

    const header = (
        <div className="group-wrapper">
            <img className="group-logo" src={props.logo} />
            <span className="group-name">{props.name instanceof Function ? props.name(t) : props.name}</span>
        </div>
    );

    return (
        <Accordion activeIndex={0} expandIcon="pi pi-chevron-left">
            <AccordionTab headerTemplate={header}>
                {props.children}
            </AccordionTab>
        </Accordion>
    );
};