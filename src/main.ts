import { Application, Container, Graphics, Text } from "pixi.js";
import { createGridDisplay, updateGridDisplay } from "./gridDisplay";
import { gridHeight, gridWidth, numCols, numRows } from "./gridSettings";
import { Grid } from "./gridData";
import { buttonPanel } from "./buttons";

(async () => {
  const app = new Application();
  await app.init({ resizeTo: window, background: "white" });
  document.body.appendChild(app.canvas);

  const titleText = new Text({ text: "Sandbox" });
  app.stage.addChild(titleText);
  
  const gridContainer = new Container({ x: 2, y: 40 });
  app.stage.addChild(gridContainer)

  const gridFrame = new Graphics()
    .rect(0, 0, gridWidth, gridHeight)
    .fill("black")
    .stroke({ color: "red", width: 4 });
  gridContainer.addChild(gridFrame)

  const gridData = new Grid(numRows, numCols);
  const gridDisplay = createGridDisplay(gridData, gridContainer);

  app.stage.addChild(buttonPanel);
  buttonPanel.position = { x: 0, y: titleText.height + gridFrame.height + 20 };

  app.ticker.add(() => {
    updateGridDisplay(gridData, gridDisplay);
    gridData.update();
  });
})();
