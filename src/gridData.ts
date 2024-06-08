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
  placeElement(position: CellPosition, element: ElementType): void {
    this.grid[position.row][position.col] = element;
    this.visit(position);
  }

  // Move the element at the initialPosition to nextPosition
  moveElement(initialPosition: CellPosition, nextPosition: CellPosition) {
    this.placeElement(
      nextPosition,
      this.elementAt(initialPosition.row, initialPosition.col)
    );
    this.placeElement(initialPosition, "empty");
    this.visit(nextPosition);
  }

  swapElements(positionA: CellPosition, positionB: CellPosition) {
    const temp = this.elementAt(positionA.row, positionA.col);
    this.placeElement(positionA, this.elementAt(positionB.row, positionB.col));
    this.placeElement(positionB, temp);
    this.visit(positionA)
    this.visit(positionB)
  }

  private visit(position: CellPosition): void {
    this.visited[position.row][position.col] = true;
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
        const position = {row, col}

        switch (element) {
          case "sand":
            updateSand(this, position);
            break;
          case "water":
            updateWater(this, position);
            break;
          case "stone":
            updateStone(this, position);
            break;
        }

        this.visit(position);
      }
    }

    this.resetVisited();
  }
}
