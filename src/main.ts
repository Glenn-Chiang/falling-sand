import { Application, Container } from "pixi.js";
import { createGrid, updateGridDisplay } from "./gridRenderer";
import { gridHeight, gridWidth, numCols, numRows } from "./gridSettings";
import { Element } from "./elements";
import { initializeGridData } from "./gridData";

const app = new Application();
await app.init({ width: gridWidth, height: gridHeight });
document.body.appendChild(app.canvas);

const gridData: Element[][] = initializeGridData(numRows, numCols)
const gridContainer = new Container();
app.stage.addChild(gridContainer);

const gridDisplay = createGrid(gridData, gridContainer)

app.ticker.add(() => {
  updateGridDisplay(gridData, gridDisplay)
});
