import React, { ReactElement } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

interface Props {
    name: string,
    logo: string
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const header = (
        <div className="group-wrapper">
            <img className="group-logo" src={props.logo} />
            <span className="group-name">{props.name}</span>
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