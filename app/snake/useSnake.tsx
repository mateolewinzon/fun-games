import { useEffect, useState, useRef } from "react";
import type { Snake, Food, Direction, Status } from "./types";
import {
  checkCollision,
  checkEating,
  checkStoppedGame,
  getTimeInterval,
  initialGameState,
  getNewDirection,
  getSupposedNextSnake,
} from "./snake";

export default function useSnake(mapSize: number = 20) {
  const [{ snake, food, level, status }, setGameData] = useState<{
    snake: Snake;
    food: Food;
    level: number;
    status: Status;
  }>(initialGameState);

  const direction = useRef<Direction>("right"); //I don't want the lifecycle to be dependant on the chosen next direction.
  const hasChangedDirection = useRef<Boolean>(false); //auxiliary value to prevent multiple direction changes in the same time slice.
  const timeSlice = getTimeInterval(level);

  const restartGame = () => {
    setGameData(initialGameState);
    direction.current = "right";
  };

  const togglePause = () => {
    setGameData((currentState) => ({
      ...currentState,
      status: currentState.status === "paused" ? "playing" : "paused",
    }));
  };

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      const { newDirection, hasChanged } = getNewDirection(
        event.key,
        direction.current,
        hasChangedDirection.current
      );

      if (hasChanged) {
        direction.current = newDirection;
        hasChangedDirection.current = true;
      }
    }

    document.addEventListener("keydown", handleKeyPress, true);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameData((currentState) => {
        const isStopped = checkStoppedGame(currentState.status);

        if (isStopped) {
          clearInterval(interval);

          return currentState;
        }

        const supposedNextSnake = getSupposedNextSnake(
          currentState.snake,
          direction.current
        );

        const collision = checkCollision(supposedNextSnake, mapSize);

        if (collision) {
          clearInterval(interval);

          return {
            ...currentState,
            status: "lost",
          };
        }

        const { newFood, newSnake, newLevel } = checkEating(
          currentState.level,
          currentState.food,
          supposedNextSnake
        );

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
