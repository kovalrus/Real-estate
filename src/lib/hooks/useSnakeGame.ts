import { useState, useEffect, useCallback } from 'react';
import { Direction, Position, GameState } from '../types/snake';

const BOARD_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 5, y: 5 };
const GAME_SPEED = 150;

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: 'RIGHT',
    isGameOver: false,
    score: 0,
  });

  const moveSnake = useCallback(() => {
    if (gameState.isGameOver) return;

    setGameState((prev) => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (prev.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collision with walls
      if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE
      ) {
        return { ...prev, isGameOver: true };
      }

      // Check collision with self
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, isGameOver: true };
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === prev.food.x && head.y === prev.food.y) {
        // Generate new food position
        const newFood = {
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        };
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 1,
        };
      }

      newSnake.pop();
      return { ...prev, snake: newSnake };
    });
  }, [gameState.isGameOver]);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prev) => {
      // Prevent 180-degree turns
      const invalidMove =
        (newDirection === 'UP' && prev.direction === 'DOWN') ||
        (newDirection === 'DOWN' && prev.direction === 'UP') ||
        (newDirection === 'LEFT' && prev.direction === 'RIGHT') ||
        (newDirection === 'RIGHT' && prev.direction === 'LEFT');

      if (invalidMove) return prev;

      return { ...prev, direction: newDirection };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: 'RIGHT',
      isGameOver: false,
      score: 0,
    });
  }, []);

  return {
    gameState,
    moveSnake,
    changeDirection,
    resetGame,
    BOARD_SIZE,
    GAME_SPEED,
  };
}; 