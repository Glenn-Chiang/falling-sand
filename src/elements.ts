export type ElementType = "empty" | "sand" | "water";

export interface Element {
  update: (grid: ElementType[][]) => void
}



export function getSelectedElement(): ElementType {
  return "sand";
}
