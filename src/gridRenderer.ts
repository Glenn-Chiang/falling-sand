import { Container, Graphics } from "pixi.js";
import { getElementGraphicsContext } from "./cellGraphics";
import { Element, getSelectedElement } from "./elements";

export function createGrid(gridData: Element[][], gridContainer: Container) {
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

interface CellPosition {
  row: number;
  col: number;
}

function createCell(
  gridData: Element[][],
  cellPosition: CellPosition,
  element: Element
) {
  const graphicsContext = getElementGraphicsContext(element);
  const cell = new Graphics(graphicsContext);
  cell.eventMode = "static";

  cell.on("pointerdown", () => {
    console.log("hello");
    const selectedElement = getSelectedElement();
    updateCellData(gridData, cellPosition, selectedElement);
  });

  return cell;
}

// Update the element at the specified cell position on the grid
function updateCellData(
  gridData: Element[][],
  cellPosition: CellPosition,
  element: Element
) {
  const newGridData = gridData.map((row) => row.slice()); // Deep copy grid data
  gridData[cellPosition.row][cellPosition.col] = element;
  return newGridData;
}

// Reads from gridData and updates the display accordingly
// This function does not update the grid data
export function updateGridDisplay(
  gridData: Element[][],
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
function updateCellDisplay(cell: Graphics, element: Element) {
  const graphicsContext = getElementGraphicsContext(element);
  if (graphicsContext) {
    cell.context = graphicsContext;
  }
}
