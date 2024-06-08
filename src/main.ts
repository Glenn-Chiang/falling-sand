import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { createGridDisplay, updateGridDisplay } from "./gridDisplay";
import { gridHeight, gridWidth, numCols, numRows } from "./gridSettings";
import { Grid, grid } from "./gridData";
import { buttonPanel } from "./buttons";

(async () => {
  const app = new Application();
  await app.init({ resizeTo: window, background: "white" });
  document.body.appendChild(app.canvas);

  // Add title
  const titleText = new Text({
    text: "Sandbox",
    style: new TextStyle({ fontFamily: "consolas" }),
  });
  app.stage.addChild(titleText);

  // Add grid container
  const gridContainer = new Container({ x: 2, y: 40 });
  app.stage.addChild(gridContainer);

  const gridFrame = new Graphics()
    .rect(0, 0, gridWidth, gridHeight)
    .fill("black")
    .stroke({ color: "red", width: 4 });
  gridContainer.addChild(gridFrame);

  // Matrix of cell graphics which visually represent the abstract grid object
  const cellGraphics = createGridDisplay(grid, gridContainer);

  // Add buttons to select elements or reset grid
  app.stage.addChild(buttonPanel);
  buttonPanel.position = { x: 0, y: titleText.height + gridFrame.height + 20 };

  app.ticker.add(() => {
    updateGridDisplay(grid, cellGraphics);
    grid.update();
  });
})();
