'use client';

import { useEffect, useCallback } from 'react';
import { useSnakeGame } from '@/lib/hooks/useSnakeGame';
import { Direction } from '@/lib/types/snake';

export default function SnakeGame() {
  const { gameState, moveSnake, changeDirection, resetGame, BOARD_SIZE, GAME_SPEED } =
    useSnakeGame();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const directionMap: { [key: string]: Direction } = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      if (directionMap[key]) {
        changeDirection(directionMap[key]);
      }
    },
    [changeDirection]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold">Score: {gameState.score}</div>
      <div
        className="grid bg-white border-2 border-gray-300 rounded-lg shadow-lg"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          gap: '1px',
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = gameState.snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isFood = gameState.food.x === x && gameState.food.y === y;

          return (
            <div
              key={index}
              className={`w-5 h-5 ${
                isSnake
                  ? 'bg-green-500'
                  : isFood
                  ? 'bg-red-500'
                  : 'bg-gray-100'
              }`}
            />
          );
        })}
      </div>
      {gameState.isGameOver && (
        <div className="mt-4 text-center">
          <div className="text-xl font-bold text-red-500 mb-2">Game Over!</div>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 