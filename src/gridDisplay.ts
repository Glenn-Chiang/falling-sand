import { Container, Graphics } from "pixi.js";
import { getElementGraphicsContext } from "./cellGraphics";
import { ElementType } from "./elements";
import { CellPosition, Grid } from "./gridData";
import { getActiveElement } from "./elementSelection";

export function createGrid(grid: Grid, gridContainer: Container) {
  const gridDisplay = [];

  for (let row = 0; row < grid.numRows; row++) {
    const rowOfCells = [];

    for (let col = 0; col < grid.numCols; col++) {
      const element = grid.getElementAt(row, col);
      const cell = createCell(grid, { row, col }, element);
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
  grid: Grid,
  cellPosition: CellPosition,
  element: ElementType
) {
  const graphicsContext = getElementGraphicsContext(element);
  const cell = new Graphics(graphicsContext);
  cell.eventMode = "static";

  const onInteract = () => {
    grid.setCellElement(cellPosition, getActiveElement());
  };

  cell.on("pointermove", (event) => {
    if (event.pressure > 0) {
      // Check if user is holding down the mouse
      onInteract();
    }
  });

  cell.on("pointerdown", () => {
    onInteract();
  });

  return cell;
}

// Reads from gridData and updates the display accordingly
// This function does not update the grid data
export function updateGridDisplay(grid: Grid, gridDisplay: Graphics[][]) {
  for (let row = 0; row < grid.numRows; row++) {
    for (let col = 0; col < grid.numCols; col++) {
      const element = grid.getElementAt(row, col);
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
