import { Container, Graphics } from "pixi.js";
import { getElementGraphicsContext } from "./cellGraphics";
import { ElementType, getSelectedElement } from "./elements";
import { CellPosition, updateCellData } from "./gridData";

export function createGrid(gridData: ElementType[][], gridContainer: Container) {
  const numRows = gridData.length;
  const numCols = gridData[0].length;

  const gridDisplay = [];

  for (let row = 0; row < numRows; row++) {
    const rowOfCells = [];

    for (let col = 0; col < numCols; col++) {
      const element = gridData[row][col];
      const cell = createCell(gridData, { row, col }, element);
      gridContainer.addChild(cell);
      cell.x = col * cell.width;
      cell.y = row * cell.height;

      rowOfCells.push(cell);
    }

    gridDisplay.push(rowOfCells);
  }

  return gridDisplay;
}

function createCell(
  gridData: ElementType[][],
  cellPosition: CellPosition,
  element: ElementType
) {
  const graphicsContext = getElementGraphicsContext(element);
  const cell = new Graphics(graphicsContext);
  cell.eventMode = "static";

  cell.on("pointerdown", () => {
    const selectedElement = getSelectedElement();
    updateCellData(gridData, cellPosition, selectedElement);
  });

  return cell;
}

// Reads from gridData and updates the display accordingly
// This function does not update the grid data
export function updateGridDisplay(
  gridData: ElementType[][],
  gridDisplay: Graphics[][]
) {
  const numRows = gridData.length;
  const numCols = gridData[0].length;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const element = gridData[row][col];
      const cell = gridDisplay[row][col];
      updateCellDisplay(cell, element);
    }
  }
}

// Update the displayed cell graphics based on current cell data
function updateCellDisplay(cell: Graphics, element: ElementType) {
  const graphicsContext = getElementGraphicsContext(element);
  if (graphicsContext) {
    cell.context = graphicsContext;
  }
}
