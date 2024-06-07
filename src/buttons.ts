import { Container, Graphics } from "pixi.js";
import { elements } from "./elements";
import { elementColors } from "./elementColors";
import { setActiveElement } from "./elementSelection";

export const buttonPanel = new Container()

const buttonWidth = 100
const buttonHeight = 40
const gapWidth = 10

elements.forEach((element, index) => {
  const xPos = (buttonWidth + gapWidth) * index
  const yPos = 0
  
  const button = new Graphics().rect(xPos, yPos, buttonWidth, buttonHeight).fill(elementColors.get(element))
  button.eventMode = "static"
  
  button.on("click", () => {
    setActiveElement(element)
  })
  
  buttonPanel.addChild(button)
})


