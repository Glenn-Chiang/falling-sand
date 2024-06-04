import { Element } from "./elements";

export interface CellPosition {
  row: number;
  col: number;
}

export function initializeGridData(numRows: number, numCols: number): Element[][] {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => "empty")
  );
  
}

// Update the element at the specified cell position on the grid
export function updateCellData(
  gridData: Element[][],
  cellPosition: CellPosition,
  element: Element
) {
  const newGridData = gridData.map((row) => row.slice()); // Deepm copy grid data
  gridData[cellPosition.row][cellPosition.col] = element;
  return newGridData;
}

