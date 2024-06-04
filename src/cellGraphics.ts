import { GraphicsContext } from "pixi.js";
import { cellHeight, cellWidth } from "./gridSettings";
import { Element } from "./elements";

const emptyCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("black")
const sandCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("white");
const waterCellContext = new GraphicsContext()
  .rect(0, 0, cellWidth, cellHeight)
  .fill("blue");

const elementGraphics = new Map<Element, GraphicsContext>([
  ["empty", emptyCellContext],
  ["sand", sandCellContext],
  ["water", waterCellContext],
]);

export function getElementGraphicsContext(element: Element) {
  return elementGraphics.get(element);
}
