/// <reference types="react" />
import { AccordionData } from "./util/accordionTypes";
interface AccordionProps {
    items: AccordionData[];
}
declare function Accordion({ items }: AccordionProps): JSX.Element;
export default Accordion;
