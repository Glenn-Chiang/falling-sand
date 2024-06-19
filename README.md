# falling-sand
A simple falling sand simulation implemented in Typescript with [pixijs](https://github.com/pixijs/pixijs).  
The simulation features a 2D sandbox world in which users can freely place different kinds of elements such as sand, water and stone and watch how they interact with one another.

This is a prototype for my more sophisticated simulation project https://github.com/Glenn-Chiang/sandbox

## Concept
The fundamental idea behind the falling sand algorithm is based on the principles of [cellular automata](https://en.wikipedia.org/wiki/Cellular_automaton). A cellular automaton typically consists of a matrix of discrete cells each containing a particular state that evolves over time. In each cycle of iteration, each cell updates its state according to a predefined set of rules which determine the next state of the cell based on its current state and the states of its neighbours.

In the case of our falling sand simulation, the sandbox world is represented by a grid of cells whose states can be any one of several element types: empty, sand, water or stone. Each element follows a unique set of rules that govern its behaviour and the ways in which it interacts with its surrounding elements. For example, sand falls downward if there is an empty cell below it, or falls diagonally to the left or right if those cells are empty and otherwise remains stationary. Water, on the other hand, behaves similarly to sand except that it also attempts to move left or right, producing the effect of fluidity. As we add more kinds of elements to the simulation, their increasingly complex interactions may give rise to potentially fascinating emergent behaviour.

## Getting started
You can run the simulation locally in your web browser.
```
git clone https://github.com/Glenn-Chiang/falling-sand.git
cd falling-sand
npm install
npm run dev
```
Open your browser at http://localhost:5173. Have fun!
