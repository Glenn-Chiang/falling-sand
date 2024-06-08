
import { ElementType } from "./elements";

let activeElement: ElementType = "sand";

export function getActiveElement(): ElementType {
  return activeElement;
}

export function setActiveElement(element: ElementType): void {
  activeElement = element;
}
