/// <reference types="react" />
import "./_accordion-item.scss";
import { AccordionData } from "../util/accordionTypes";
interface AccordionItemProps {
    data: AccordionData;
    onToggle: VoidFunction;
    isActive: boolean;
}
declare function AccordionItem({ data, onToggle, isActive }: AccordionItemProps): JSX.Element;
export default AccordionItem;
