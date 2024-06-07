import { ElementType, updateSand, updateStone, updateWater } from "./elements";

export interface CellPosition {
  row: number;
  col: number;
}

export class Grid {
  private grid: ElementType[][];

  get numRows(): number {
    return this.grid.length
  }

  get numCols(): number {
    return this.grid[0].length
  }

  constructor(numRows: number, numCols: number) {
    this.grid = Grid.createGrid(numRows, numCols)
  }

  static createGrid(numRows: number, numCols: number): ElementType[][] {
    return Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => "empty")
    );
  }

  getCellElement(cellPosition: CellPosition) : ElementType {
    return this.grid[cellPosition.row][cellPosition.col]
  }

  // Update the element at the specified cell position on the grid
  setCellElement(cellPosition: CellPosition, element: ElementType): void {
    this.grid[cellPosition.row][cellPosition.col] = element;
  }

  // Determine the state of each cell on the next frame
  // Based on the states of the current cell and its neighbouring cells on the last frame
  update() {
    const nextGrid = Grid.createGrid(this.numRows, this.numCols);

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const element = this.grid[row][col]; // The element occupying the current cell on the last frame
        switch (element) {
          case "sand":
            updateSand(this.grid, nextGrid, { row, col });
            break;
          case "water":
            updateWater(this.grid, nextGrid, { row, col });
            break;
          case "stone":
            updateStone(this.grid, nextGrid, { row, col });
            break;
        }
      }
    }

    this.grid = nextGrid
  }
}
