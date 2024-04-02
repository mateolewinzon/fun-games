import { Ref } from "react";
import { Direction, Food, Snake, Status } from "./types";

export const initialGameState: {
  snake: Snake;
  food: Food;
  level: number;
  status: Status;
} = {
  snake: [[0, 10]] as Snake,
  food: [10, 10] as Food,
  level: 0,
  status: "playing",
};

export const getTimeInterval = (level: number) => 1000 * 0.95 ** level;

export const checkStoppedGame = (status: Status): Boolean =>
  status !== "playing";

export const getNewDirection = (
  keyPressed: string,
  currentDirection: Direction,
  hasChangedDirectionInCurrentTimeSlice: Boolean
) => {
  let newDirection = currentDirection;
  let hasChanged = false;

  if (hasChangedDirectionInCurrentTimeSlice) {
    return { newDirection, hasChanged };
  }

  switch (keyPressed) {
    case "ArrowUp":
      if (currentDirection !== "down") {
        newDirection = "up";
        hasChanged = true;
      }

      break;
    case "ArrowDown":
      if (currentDirection !== "up") {
        newDirection = "down";
        hasChanged = true;
      }

      break;
    case "ArrowLeft":
      if (currentDirection !== "right") {
        newDirection = "left";
        hasChanged = true;
      }

      break;
    case "ArrowRight":
      if (currentDirection !== "left") {
        newDirection = "right";
        hasChanged = true;
      }

    case "default":
      break;
  }

  return { newDirection, hasChanged };
};

const getNextHead = (
  head: [number, number],
  direction: Direction
): [number, number] => {
  switch (direction) {
    case "right":
      return [head[0] + 1, head[1]];
    case "left":
      return [head[0] - 1, head[1]];
    case "up":
      return [head[0], head[1] - 1];
    default:
      return [head[0], head[1] + 1];
  }
};

export const getSupposedNextSnake = (
  currentSnake: Snake,
  direction: Direction
): Snake => {
  const newSnake = [...currentSnake];
  const newHead = getNextHead(newSnake[0], direction);
  newSnake.unshift(newHead as [number, number]);

  return newSnake;
};

const collideWithWalls = (snake: Snake, mapSize: number): Boolean => {
  const head = snake[0];

  const collideYWalls = head[0] < 0 || head[0] >= mapSize;
  const collideXWalls = head[1] < 0 || head[1] >= mapSize;

  if (collideYWalls || collideXWalls) {
    return true;
  }

  return false;
};

const collideWithSelf = (snake: Snake): Boolean => {
  const head = snake[0];

  for (const segment of snake.slice(1)) {
    if (segment[0] === head[0] && segment[1] === head[1]) {
      return true;
    }
  }

  return false;
};

export const checkCollision = (snake: Snake, mapSize: number): Boolean => {
  return collideWithWalls(snake, mapSize) || collideWithSelf(snake);
};

export const checkEating = (
  level: number,
  food: Food,
  snake: Snake
): { newSnake: Snake; newFood: Food; newLevel: number } => {
  const newHead = snake[0];

  const eats = newHead[0] === food[0] && newHead[1] === food[1];

  let newFood = food;
  let newLevel = level;
  let newSnake = snake;

  if (eats) {
    newFood = [
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
    ] as Food;
    newLevel = level + 1;
  } else {
    newSnake.pop();
  }

  return { newFood, newLevel, newSnake };
};
