import { Application, Container, Graphics } from "pixi.js";
import { createGrid, updateGridDisplay } from "./gridDisplay";
import { gridHeight, gridWidth, numCols, numRows } from "./gridSettings";
import { Grid } from "./gridData";
import { buttonPanel } from "./buttons";

const app = new Application();
await app.init({ resizeTo: window, background: "white" });
document.body.appendChild(app.canvas);

const gridData = new Grid(numRows, numCols);

const gridFrame = new Graphics()
  .rect(2, 2, gridWidth, gridHeight)
  .fill("black")
  .stroke({ color: "red", width: 4 });

app.stage.addChild(gridFrame);

const gridContainer = new Container({ x: 2, y: 2 });
gridFrame.addChild(gridContainer);

const gridDisplay = createGrid(gridData, gridContainer);

app.stage.addChild(buttonPanel)
buttonPanel.position = {x: 0, y: gridFrame.height + 10}

app.ticker.add(() => {
  updateGridDisplay(gridData, gridDisplay);
  gridData.update()
});

