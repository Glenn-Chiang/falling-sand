import { ElementType, updateSand, updateStone, updateWater } from "./elements";

export interface CellPosition {
  row: number;
  col: number;
}

export function initializeGridData(
  numRows: number,
  numCols: number,
  initialElement: ElementType = "empty"
): ElementType[][] {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => initialElement)
  );
}

// Update the element at the specified cell position on the grid
export function updateCellData(
  gridData: ElementType[][],
  cellPosition: CellPosition,
  element: ElementType
): void {
  gridData[cellPosition.row][cellPosition.col] = element;
}

// Copies all values from matrixIn to matrixOut, assuming they have the same dimensions
function copyMatrix<T>(matrixIn: T[][], matrixOut: T[][]) {
  for (let i = 0; i < matrixIn.length; i++) {
    for (let j = 0; j < matrixIn[0].length; j++) {
      matrixOut[i][j] = matrixIn[i][j];
    }
  }
}

// Determine the state of each cell on the next frame
// Based on the states of the current cell and its neighbouring cells on the last frame
export function updateGrid(grid: ElementType[][]) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const nextGrid = initializeGridData(numRows, numCols);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const element = grid[row][col]; // The element occupying the current cell on the last frame
      switch (element) {
        case "sand":
          updateSand(grid, nextGrid, { row, col });
          break;
        case "water":
          updateWater(grid, nextGrid, { row, col });
          break
        case "stone":
          updateStone(grid, nextGrid, { row, col });
          break
      }
    }
  }

  copyMatrix(nextGrid, grid);
}
