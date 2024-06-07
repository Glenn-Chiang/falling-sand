import { ElementType, updateSand, updateStone, updateWater } from "./elements";

export interface CellPosition {
  row: number;
  col: number;
}

export class Grid {
  private grid: ElementType[][]; // The grid on the current frame
  private nextGrid: ElementType[][]; // The grid on the next frame

  get numRows(): number {
    return this.grid.length
  }

  get numCols(): number {
    return this.grid[0].length
  }

  constructor(numRows: number, numCols: number) {
    this.grid = Grid.createGrid(numRows, numCols)
    this.nextGrid = Grid.createGrid(numRows, numCols)
  }

  static createGrid(numRows: number, numCols: number): ElementType[][] {
    return Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => "empty")
    );
  }

  private resetNextGrid() {
    this.nextGrid = Grid.createGrid(this.numRows, this.numCols)
  }

  getElementAt(row: number, col: number) : ElementType {
    return this.grid[row][col]
  }

  // Update the element at the specified cell position on the grid
  setCellElement(cellPosition: CellPosition, element: ElementType): void {
    this.grid[cellPosition.row][cellPosition.col] = element;
  }

  // Move the element at the initialPosition to nextPosition
  moveElement(initialPosition: CellPosition, nextPosition: CellPosition) {
    this.nextGrid[nextPosition.row][nextPosition.col] = this.grid[initialPosition.row][initialPosition.col]
    this.nextGrid[initialPosition.row][initialPosition.col] = "empty"
  }

  placeElement(position: CellPosition, element: ElementType) {
    this.nextGrid[position.row][position.col] = element
  }

  // Determine the state of each cell on the next frame
  // Based on the states of the current cell and its neighbouring cells on the last frame
  update() {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const element = this.grid[row][col]; // The element occupying the current cell on the last frame
        switch (element) {
          case "sand":
            updateSand(this, { row, col });
            break;
          case "water":
            updateWater(this.grid, this.nextGrid, { row, col });
            break;
          case "stone":
            updateStone(this, {row, col});
            break;
        }
      }
    }

    this.grid = this.nextGrid
    this.resetNextGrid()
  }
}
