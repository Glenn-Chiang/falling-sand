import { CellPosition } from "./gridData";

export const elements = ["empty", "sand", "water", "stone"] as const;

type Elements = typeof elements;
export type ElementType = Elements[number];

let activeElement: ElementType = "sand";

export function getActiveElement(): ElementType {
  return activeElement;
}

export function setActiveElement(element: ElementType): void {
  activeElement = element;
  console.log(activeElement);
}

export function updateStone(
  _: ElementType[][],
  nextGrid: ElementType[][],
  cellPosition: CellPosition
) {
  const { row, col } = cellPosition;
  nextGrid[row][col] = "stone";
}

export function updateSand(
  grid: ElementType[][],
  nextGrid: ElementType[][],
  cellPosition: CellPosition
) {
  const { row, col } = cellPosition;
  const numRows = grid.length;

  // If reached bottom, don't move
  if (row == numRows - 1) {
    nextGrid[row][col] = "sand";
    return;
  }

  // Move straight downward if space is empty
  if (grid[row + 1][col] === "empty") {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col] = "sand";
    return;
  }

  // Move diagonally downward if possible
  // If left-down is empty and right-down is occupied, move left-down
  if (
    grid[row + 1][col - 1] === "empty" &&
    grid[row + 1][col + 1] !== "empty"
  ) {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col - 1] = "sand";
    return;
  }
  // If right-down is empty and left-down is occupied, move right-down
  if (
    grid[row + 1][col - 1] !== "empty" &&
    grid[row + 1][col + 1] === "empty"
  ) {
    nextGrid[row][col] = "empty";
    nextGrid[row + 1][col + 1] = "sand";
    return;
  }
  // If both left-down and right-down are empty, randomly decide whether to move left-down or right-down
  if (
    grid[row + 1][col - 1] === "empty" &&
    grid[row + 1][col + 1] === "empty"
  ) {
    nextGrid[row][col] = "empty";
    if (Math.random() < 0.5) {
      nextGrid[row + 1][col - 1] = "sand";
    } else {
      nextGrid[row + 1][col + 1] = "sand";
    }
    return;
  }

  // If there is no empty space to move to, don't move
  nextGrid[row][col] = "sand";
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
  if (grid[row][col - 1] === "empty" && grid[row][col + 1] === "empty") {
    nextGrid[row][col] = "empty"
    nextGrid[row][col - 1] = "water"
    return
  }

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

  // If there is no empty space to move to, don't move
  nextGrid[row][col] = "water";
}
