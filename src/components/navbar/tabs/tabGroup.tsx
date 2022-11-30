import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import "../../css/tabGroup.css";

import { TranslateFunctionType } from "../../../contexts/language";
import { useTranslator } from "../../internationalization/translators";
import {BLUE3} from "../../../constants";

interface Props {
    name: string | ((t: TranslateFunctionType) => string);
    logo?: string;
    collapsible?: boolean;
    fontWeightBold: boolean;
    collapsed?: boolean;
    accordionHeaderTextColor?: string;
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const t = useTranslator();

    const collapsible = props.collapsible !== undefined ? props.collapsible : true;

    const header = (
        <div style={{display: "flex", justifyContent: (props.logo ? "": "center"), fontWeight: (props.fontWeightBold ? "bold":"normal")}} className="group-wrapper">
            {props.logo ? <img style={{height: "16px", width: "22px"}} className="group-logo" src={props.logo} />: null}
            
            <span style={{color: (props.accordionHeaderTextColor ?  props.accordionHeaderTextColor : BLUE3)}} className="group-name">{props.name instanceof Function ? props.name(t) : props.name}</span>
        </div>
    );

    return (
        <div className="disabledNoOpacity">
            <Accordion className="accordion-style" activeIndex={props.collapsed ? -1 : 0} expandIcon="pi pi-chevron-left">
                <AccordionTab className="accordiontab-style" disabled={!collapsible} headerTemplate={header}>
                    {props.children}
                </AccordionTab>
            </Accordion>
        </div>
    );

};

