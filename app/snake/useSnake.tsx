import React, { useEffect, useState, useRef } from "react";
import type { Snake, Food, Direction } from "./types";

export default function useSnake() {
  const [{ snake, food, level }, setGameData] = useState<{
    snake: Snake;
    food: Food;
    level: number;
  }>({
    snake: [[0, 10]],
    food: [10, 10],
    level: 0,
  });

  const direction = useRef<Direction>("right"); //I dont want the lifecycle to be dependant on the direction.
  const timeSlice = 1000 * 0.9 ** level;

  useEffect(() => {
    const handleDirectionChange = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          direction.current = "up";
          break;
        case "ArrowDown":
          direction.current = "down";
          break;
        case "ArrowLeft":
          direction.current = "left";
          break;
        case "ArrowRight":
          direction.current = "right";
          break;
        case "default":
          break;
      }
    };

    document.addEventListener("keydown", handleDirectionChange, true);

    return () => {
      document.removeEventListener("keydown", handleDirectionChange, false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      function getNewHead(head: [number, number]) {
        switch (direction.current) {
          case "right":
            return [head[0] + 1, head[1]];
          case "left":
            return [head[0] - 1, head[1]];
          case "up":
            return [head[0], head[1] - 1];
          default:
            return [head[0], head[1] + 1];
        }
      }

      setGameData(({ snake: prevSnake, food: prevFood, level: prevLevel }) => {
        const newSnake = [...prevSnake];
        const newHead = getNewHead(prevSnake[0]);
        newSnake.unshift(newHead as [number, number]);

        const canEat = newHead[0] === prevFood[0] && newHead[1] === prevFood[1];

        let newFood = prevFood;
        let newLevel = prevLevel;

        if (canEat) {
          newFood = [
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20),
          ];
          newLevel = prevLevel + 1;
        } else {
          newSnake.pop();
        }

        return { snake: newSnake, food: newFood, level: newLevel };
      });
    }, timeSlice);

    return () => clearInterval(interval);
  }, [timeSlice]);

  return {
    snake,
    direction,
    food,
  };
}
