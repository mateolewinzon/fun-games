export type Player = "red" | "blue";
export type Cell = { value: Player | "" };
export type Board = Cell[][];
export type Line = [number, number][]; // [row, column]
