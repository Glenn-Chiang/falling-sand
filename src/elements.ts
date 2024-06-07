import { CellPosition, Grid } from "./gridData";

export const elements = ["empty", "sand", "water", "stone"] as const;

type Elements = typeof elements;
export type ElementType = Elements[number];

export function updateStone(grid: Grid, cellPosition: CellPosition) {
  grid.placeElement({ row: cellPosition.row, col: cellPosition.col }, "stone");
}

export function updateSand(grid: Grid, cellPosition: CellPosition) {
  const { row, col } = cellPosition;

  // If reached bottom, don't move
  if (row == grid.numRows - 1) {
    grid.placeElement({ row, col }, "sand");
    return;
  }

  // Move straight downward if space is empty
  if (grid.getElementAt(row + 1, col) === "empty") {
    grid.moveElement({ row, col }, { row: row + 1, col });
    return;
  }

  // Move diagonally downward if possible

  // If left and left-down are empty and right-down is occupied, move left-down
  if (
    grid.getElementAt(row, col - 1) === "empty" &&
    grid.getElementAt(row + 1, col - 1) === "empty" &&
    grid.getElementAt(row + 1, col + 1) !== "empty"
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    return;
  }
  // If right and right-down are empty and left-down is occupied, move right-down
  if (
    grid.getElementAt(row, col + 1) === "empty" &&
    grid.getElementAt(row + 1, col - 1) !== "empty" &&
    grid.getElementAt(row + 1, col + 1) === "empty"
  ) {
    grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    return;
  }

  // If both left-down and right-down are empty, randomly decide whether to move left-down or right-down
  if (
    grid.getElementAt(row + 1, col - 1) === "empty" &&
    grid.getElementAt(row + 1, col + 1) === "empty"
  ) {
    if (Math.random() < 0.5) {
      grid.moveElement({ row, col }, { row: row + 1, col: col - 1 });
    } else {
      grid.moveElement({ row, col }, { row: row + 1, col: col + 1 });
    }
    return;
  }

  // If there is no empty space to move to, don't move
  grid.placeElement({ row, col }, "sand");
}

export function updateWater(
  grid: ElementType[][],
  nextGrid: ElementType[][],
  cellPosition: CellPosition
) {
  const { row, col } = cellPosition;
  const numRows = grid.length;

  // If reached bottom, don't move
  if (row == numRows - 1) {
    nextGrid[row][col] = "water";
    return;
  }

  // Move straight downward if space is empty
  if (grid[row + 1][col] === "empty") {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col] = "water";
    return;
  }

  // If left is empty and right is occupied, move left

  // Move diagonally downward if possible
  // If left-down is empty and right-down is occupied, move left-down
  if (
    grid[row + 1][col - 1] === "empty" &&
    grid[row + 1][col + 1] !== "empty"
  ) {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col - 1] = "water";
    return;
  }
  // If right-down is empty and left-down is occupied, move right-down
  if (
    grid[row + 1][col - 1] !== "empty" &&
    grid[row + 1][col + 1] === "empty"
  ) {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col + 1] = "water";
    return;
  }
  // If both left-down and right-down are empty, randomly decide whether to move left-down or right-down
  if (
    grid[row + 1][col - 1] === "empty" &&
    grid[row + 1][col + 1] === "empty"
  ) {
    nextGrid[row][col] = "empty";
    if (Math.random() < 0.5) {
      nextGrid[row + 1][col - 1] = "water";
    } else {
      nextGrid[row + 1][col + 1] = "water";
    }
    return;
  }

  // If below is water, water will move left or right on water
  if (grid[row + 1][col] === "water") {
    if (grid[row][col - 1] === "empty" && grid[row][col + 1] !== "empty") {
      nextGrid[row][col] = "empty";
      nextGrid[row][col - 1] = "water";
      return;
    }
  
    // If right is empty and left is occupied, move right
    if (grid[row][col + 1] === "empty" && grid[row][col - 1] !== "empty") {
      nextGrid[row][col] = "empty";
      nextGrid[row][col + 1] = "water";
      return;
    }
  
    // If both left and right are empty, randomly decide whether to move left or right
    // if (grid[row][col - 1] === "empty" && grid[row][col + 1] === "empty") {
    //   nextGrid[row][col] = "empty";
    //   if (Math.random() < 0.5) {
    //     nextGrid[row][col - 1] = "water";
    //   } else {
    //     nextGrid[row][col + 1] = "water";
    //   }
    //   return;
    // }
  }

  // If there is no empty space to move to, don't move
  nextGrid[row][col] = "water";
}
