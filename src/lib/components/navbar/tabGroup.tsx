import { Accordion, AccordionTab } from 'primereact/accordion';

export const TabGroup = (props: any) => (
    <Accordion>
        <AccordionTab header="Test">
            {props.children}
        </AccordionTab>
    </Accordion>
);