import { CellPosition, Grid } from "./gridData";

export const elements = ["empty", "sand", "water", "stone"] as const;

type Elements = typeof elements;
export type ElementType = Elements[number];

// Stone simply stays in place
export function updateStone(grid: Grid, cellPosition: CellPosition) {
  return;
}

export function updateSand(grid: Grid, cellPosition: CellPosition) {
  const { row, col } = cellPosition;

  // If reached bottom, don't move
  if (row == grid.numRows - 1) {
    return;
  }

  // Move straight downward if space is empty
  if (grid.elementAt(row + 1, col) === "empty") {
    grid.moveElement({ row, col }, { row: row + 1, col });
    return;
  }

  // Move diagonally downward if possible

  // If left and left-down are empty and right-down is occupied, move left-down
  if (
    grid.elementAt(row, col - 1) === "empty" &&
    grid.elementAt(row + 1, col - 1) === "empty" &&
    grid.elementAt(row + 1, col + 1) !== "empty"
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    return;
  }
  // If right and right-down are empty and left-down is occupied, move right-down
  if (
    grid.elementAt(row, col + 1) === "empty" &&
    grid.elementAt(row + 1, col - 1) !== "empty" &&
    grid.elementAt(row + 1, col + 1) === "empty"
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    return;
  }

  // If both left-down and right-down are empty, randomly decide whether to move left-down or right-down
  if (
    grid.elementAt(row + 1, col - 1) === "empty" &&
    grid.elementAt(row + 1, col + 1) === "empty"
  ) {
    if (Math.random() < 0.5) {
      grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    } else {
      grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    }
    return;
  }
}

export function updateWater(grid: Grid, cellPosition: CellPosition) {
  const { row, col } = cellPosition;

  // If reached bottom, don't move
  if (row == grid.numRows - 1) {
    return;
  }

  // Move straight downward if space is empty
  if (grid.isCellEmpty(row + 1, col)) {
    grid.moveElement({ row, col }, { row: row + 1, col });
    return;
  }

  // If left and left-down are empty and right-down is occupied, move left-down
  if (
    grid.isCellEmpty(row, col - 1) &&
    grid.isCellEmpty(row + 1, col - 1) &&
    !grid.isCellEmpty(row + 1, col + 1)
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    return;
  }
  // If right and right-down are empty and left-down is occupied, move right-down
  if (
    grid.isCellEmpty(row, col + 1) &&
    grid.isCellEmpty(row + 1, col + 1) &&
    !grid.isCellEmpty(row + 1, col - 1)
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    return;
  }
  // If both left-down and right-down are empty, randomly decide whether to move left-down or right-down
  if (
    grid.isCellEmpty(row + 1, col - 1) &&
    grid.isCellEmpty(row + 1, col + 1)
  ) {
    if (Math.random() < 0.5) {
      grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    } else {
      grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    }
    return;
  }

  if (grid.isCellEmpty(row, col - 1) && !grid.isCellEmpty(row, col + 1)) {
    grid.moveElement({ row, col }, { row, col: col - 1 });
    return;
  }

  // If right is empty and left is occupied, move right
  if (grid.isCellEmpty(row, col + 1) && !grid.isCellEmpty(row, col - 1)) {
    grid.moveElement({ row, col }, { row, col: col + 1 });
    return;
  }

  // If both left and right are empty, randomly decide whether to move left or right
  if (grid.isCellEmpty(row, col - 1) && grid.isCellEmpty(row, col + 1)) {
    if (Math.random() < 0.5) {
      grid.moveElement({ row, col }, { row, col: col - 1 });
    } else {
      grid.moveElement({ row, col }, { row, col: col + 1 });
    }
    return;
  }
}
