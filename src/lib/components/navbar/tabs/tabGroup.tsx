import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

import "../../css/tabGroup.css";
import { TranslateFunctionType } from "../../../contexts/language";
import { useTranslator } from "../../internationalization/translators";

interface Props {
    name: string | ((t: TranslateFunctionType) => string);
    logo: string;
    disable?: boolean;
    collapse?: boolean;
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const t = useTranslator();

    const header = (
        <div className="group-wrapper">
            <img className="group-logo" src={props.logo} />
            <span className="group-name">{props.name instanceof Function ? props.name(t) : props.name}</span>
        </div>
    );

    return (
        <div className="disabledNoOpacity">
            <Accordion activeIndex={props.collapse ? -1 : 0} expandIcon="pi pi-chevron-left">
                <AccordionTab disabled={props.disable} headerTemplate={header} >
                    {props.children}
                </AccordionTab>
            </Accordion>
        </div>
    );
};