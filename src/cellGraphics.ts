import { GraphicsContext } from "pixi.js";
import { cellHeight, cellWidth } from "./gridSettings";
import { ElementType } from "./elements";

const emptyCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("black")
const sandCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("F7DC6F");
const waterCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("85C1E9");

const elementGraphics = new Map<ElementType, GraphicsContext>([
  ["empty", emptyCellContext],
  ["sand", sandCellContext],
  ["water", waterCellContext],
]);

export function getElementGraphicsContext(element: ElementType) {
  return elementGraphics.get(element);
}
