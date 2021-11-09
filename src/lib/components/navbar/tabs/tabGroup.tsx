import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

import "../../css/tabGroup.css";
import { TranslateFunctionType } from "../../../contexts/language";
import { useTranslator } from "../../internationalization/translators";

interface Props {
    name: string | ((t: TranslateFunctionType) => string);
    logo: string;
    collapsible?: boolean;
    collapsed?: boolean;
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const t = useTranslator();

    const collapsible = props.collapsible !== undefined ? props.collapsible : true;
    const collapsed = props.collapsed !== undefined ? props.collapsed : false;

    const header = (
        <div className="group-wrapper">
            <img className="group-logo" src={props.logo} />
            <span className="group-name">{props.name instanceof Function ? props.name(t) : props.name}</span>
        </div>
    );

    return (
        <div className="disabledNoOpacity">
            <Accordion activeIndex={props.collapsed ? -1 : 0} expandIcon="pi pi-chevron-left">
                <AccordionTab disabled={!collapsible} headerTemplate={header}>
                    {props.children}
                </AccordionTab>
            </Accordion>
        </div>
    );
};