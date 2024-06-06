import { GraphicsContext } from "pixi.js";
import { cellHeight, cellWidth } from "./gridSettings";
import { ElementType, elements } from "./elements";
import { elementColors } from "./elementColors";

const elementGraphics: Map<ElementType, GraphicsContext> = new Map();

for (let element of elements) {
  const graphicsContext = new GraphicsContext().rect(0, 0, cellWidth, cellHeight).fill(elementColors.get(element))
  elementGraphics.set(element, graphicsContext)
}

export function getElementGraphicsContext(element: ElementType) {
  return elementGraphics.get(element);
}
