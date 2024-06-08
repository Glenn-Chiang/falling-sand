import { ElementType, updateSand, updateStone, updateWater } from "./elements";

export interface CellPosition {
  row: number;
  col: number;
}

export class Grid {
  private grid: ElementType[][]; // The grid on the current frame
  private visited: boolean[][]; // Keeps track of which cells on the grid have already been visited in the current update loop

  get numRows(): number {
    return this.grid.length;
  }

  get numCols(): number {
    return this.grid[0].length;
  }

  constructor(numRows: number, numCols: number) {
    this.grid = Grid.createMatrix(numRows, numCols, "empty");
    this.visited = Grid.createMatrix(numRows, numCols, false);
  }

  static createMatrix<T>(
    numRows: number,
    numCols: number,
    defaultValue: T
  ): T[][] {
    return Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => defaultValue)
    );
  }

  // Fully reset the grid
  reset() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        this.grid[i][j] = "empty";
        this.visited[i][j] = false;
      }
    }
  }

  private resetVisited() {
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        this.visited[i][j] = false;
      }
    }
  }

  elementAt(row: number, col: number): ElementType {
    return this.grid[row][col];
  }

  // Update the element at the specified cell position on the grid
  placeElement(row: number, col: number, element: ElementType): void {
    this.grid[row][col] = element;
    this.visit(row, col);
  }

  // Move the element at the initialPosition to nextPosition
  moveElement(initialPosition: CellPosition, nextPosition: CellPosition) {
    this.grid[nextPosition.row][nextPosition.col] =
      this.grid[initialPosition.row][initialPosition.col];
    this.grid[initialPosition.row][initialPosition.col] = "empty";
    this.visit(nextPosition.row, nextPosition.col);
  }

  private visit(row: number, col: number): void {
    this.visited[row][col] = true;
  }

  isCellEmpty(row: number, col: number): boolean {
    return this.grid[row][col] === "empty";
  }

  // Determine the state of each cell on the next frame
  // Based on the states of the current cell and its neighbouring cells on the last frame
  update() {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        // Skip over cells that have already been visited
        if (this.visited[row][col]) {
          continue;
        }

        const element = this.grid[row][col];
        switch (element) {
          case "sand":
            updateSand(this, { row, col });
            break;
          case "water":
            updateWater(this, { row, col });
            break;
          case "stone":
            updateStone(this, { row, col });
            break;
        }

        this.visit(row, col);
      }
    }

    this.resetVisited();
  }
}
