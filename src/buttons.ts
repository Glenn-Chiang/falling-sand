import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { elementColors } from "./elementColors";
import { setActiveElement } from "./elementSelection";
import { elements } from "./elements";
import { gridHeight, gridWidth } from "./gridSettings";
import { grid } from "./gridData";

export const buttonPanel = new Container({
  width: gridWidth,
  height: gridHeight,
});

const buttonWidth = 100;
const buttonHeight = 40;
const gapWidth = 10;

const buttonLabelStyle = new TextStyle({
  fontSize: 20,
  fontFamily: "consolas",
  fill: "white",
  align: "center",
});

// Add a button for each element
// Clicking on an element button will set that element as the current active element
// which will be drawn on the canvas
elements.forEach((element, index) => {
  const xPos = (buttonWidth + gapWidth) * index;
  const yPos = 0;

  const button = createButton(
    xPos,
    yPos,
    elementColors.get(element) || "black", // Get color from color map. If not found, default to black.
    element,
    () => setActiveElement(element)
  );
  buttonPanel.addChild(button);
});

console.log(buttonPanel.width);
const resetButton = createButton(
  gridWidth - buttonWidth,
  0,
  "red",
  "reset",
  () => grid.reset()
);
buttonPanel.addChild(resetButton);

function createButton(
  x: number,
  y: number,
  fillColor: string,
  labelString: string,
  onClick: () => void
): Container {
  const button = new Container({
    x,
    y,
    width: buttonWidth,
    height: buttonHeight,
  });
  button.eventMode = "static";
  button.on("click", onClick);

  const buttonGraphics = new Graphics()
    .rect(0, 0, buttonWidth, buttonHeight)
    .fill({ color: fillColor });

  const label = new Text({
    text: labelString,
    position: { x: buttonGraphics.width / 2, y: buttonGraphics.height / 2 },
    anchor: 0.5,
    style: buttonLabelStyle,
  });

  button.addChild(buttonGraphics);
  button.addChild(label);

  return button;
}
