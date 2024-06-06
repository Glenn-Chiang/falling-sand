import { Application, Container, Graphics } from "pixi.js";
import { createGrid, updateGridDisplay } from "./gridRenderer";
import { gridHeight, gridWidth, numCols, numRows } from "./gridSettings";
import { ElementType } from "./elements";
import { initializeGridData, updateGrid } from "./gridData";

const app = new Application();
await app.init({ resizeTo: window, background: "white" });
document.body.appendChild(app.canvas);

const gridData: ElementType[][] = initializeGridData(numRows, numCols);

const gridFrame = new Graphics()
  .rect(2, 2, gridWidth, gridHeight)
  .fill("black")
  .stroke({ color: "red", width: 4 });

app.stage.addChild(gridFrame);

const gridContainer = new Container({ x: 2, y: 2 });
gridFrame.addChild(gridContainer);

const gridDisplay = createGrid(gridData, gridContainer);

app.ticker.add(() => {
  updateGridDisplay(gridData, gridDisplay);
  updateGrid(gridData);
});
