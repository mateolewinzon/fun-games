import React, { useEffect, useState, useRef } from "react";
import type { Snake, Food, Direction, Status } from "./types";

export default function useSnake() {
  const [{ snake, food, level, status }, setGameData] = useState<{
    snake: Snake;
    food: Food;
    level: number;
    status: Status;
  }>({
    snake: [[0, 10]],
    food: [10, 10],
    level: 0,
    status: "playing",
  });

  const direction = useRef<Direction>("right"); //I dont want the lifecycle to be dependant on the direction.
  const hasChangedDirection = useRef<Boolean>(false);
  const timeSlice = 1000 * 0.95 ** level;

  const checkCollision = (snake: Snake) => {
    const head = snake[0];

    if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
      return true;
    }

    for (const segment of snake.slice(1)) {
      if (segment[0] === head[0] && segment[1] === head[1]) {
        return true;
      }
    }
  };

  const getNewHead = (head: [number, number]) => {
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
  };

  const restartGame = () => {
    setGameData({
      snake: [[0, 10]],
      food: [10, 10],
      level: 0,
      status: "playing",
    });
    direction.current = "right";
  };

  const togglePause = () => {
    setGameData((currentState) => ({
      ...currentState,
      status: currentState.status === "paused" ? "playing" : "paused",
    }));
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (hasChangedDirection.current) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          if (direction.current !== "down") {
            direction.current = "up";
            hasChangedDirection.current = true;
            break;
          }

          break;
        case "ArrowDown":
          if (direction.current !== "up") {
            direction.current = "down";
            hasChangedDirection.current = true;

            break;
          }

          break;
        case "ArrowLeft":
          if (direction.current !== "right") {
            direction.current = "left";
            hasChangedDirection.current = true;
            break;
          }

          break;
        case "ArrowRight":
          if (direction.current !== "left") {
            direction.current = "right";
            hasChangedDirection.current = true;
            break;
          }

        case "default":
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress, true);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameData((currentState) => {
        if (currentState.status !== "playing") {
          return currentState;
        }

        const newSnake = [...currentState.snake];
        const newHead = getNewHead(newSnake[0]);
        newSnake.unshift(newHead as [number, number]);

        const collision = checkCollision(newSnake);

        if (collision) {
          clearInterval(interval);
          return {
            ...currentState,
            status: "lost",
          };
        }

        const canEat =
          newHead[0] === currentState.food[0] &&
          newHead[1] === currentState.food[1];

        let newFood = currentState.food;
        let newLevel = currentState.level;

        if (canEat) {
          newFood = [
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20),
          ];
          newLevel = currentState.level + 1;
        } else {
          newSnake.pop();
        }

        hasChangedDirection.current = false;

        return {
          snake: newSnake,
          food: newFood,
          level: newLevel,
          status: "playing",
        };
      });
    }, timeSlice);

    return () => clearInterval(interval);
  }, [timeSlice, status]);

  return {
    snake,
    direction,
    food,
    score: snake.length,
    status,
    restartGame,
    togglePause,
  };
}
