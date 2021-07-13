import React from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';

interface Props {
    name: String
}

export const TabGroup = (props: React.PropsWithChildren<Props>) => (
    <Accordion>
        <AccordionTab header={props.name}>
            {props.children}
        </AccordionTab>
    </Accordion>
);