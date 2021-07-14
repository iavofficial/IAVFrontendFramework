import React, { ReactElement } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

interface Props {
    name: string,
    logo: ReactElement
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => {
    const header = (
        <>
            <span className="group-name">{props.name}</span>
            <span className="group-logo-wrapper">{props.logo}</span>
        </>
    );

    return (
        <Accordion expandIcon="pi pi-chevron-left">
            <AccordionTab headerTemplate={header}>
                {props.children}
            </AccordionTab>
        </Accordion>
    );
};