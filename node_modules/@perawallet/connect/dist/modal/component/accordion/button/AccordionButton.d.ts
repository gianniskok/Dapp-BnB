import "./_accordion-button.scss";
import React from "react";
interface AccordionButtonProps {
    children: React.ReactNode;
    onClick: VoidFunction;
}
declare function AccordionButton({ children, onClick }: AccordionButtonProps): JSX.Element;
export default AccordionButton;
