import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Puzzle } from './puzzle';

const instantiatedBoardData = Array(4).fill(
  Array.from({ length: 5 }).fill({ score: 0, brickNumber: null })
);
let expectedBoardData = [...instantiatedBoardData];

describe('When creating a new board', () => {
  const numColours = 5;
  const numColumns = 4;
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(numColours, numColumns);
  });

  it('should have correct number of board columns', () => {
    expect(puzzle.board.length).toBe(4);
  });

  it('should have correct colours row length', () => {
    expect(puzzle.board[0].length).toBe(5);
  });

  it('should have correct instantiated board data', () => {
    expect(puzzle.board).toEqual(expectedBoardData);
  });
});

describe('When adding a single brick to the board', () => {
  const brick = {
    colours: [0, 4],
    scores: [3, 2],
  };
  const numColours = 5;
  const numColumns = 4;
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(numColours, numColumns);
    puzzle.addBricks([brick]);
  });
  afterEach(() => {
    expectedBoardData = [...instantiatedBoardData];
  });

  it('should add brick to the first available colour columns with correct scores', () => {
    expectedBoardData.splice(0, 1, [
      { score: 3, brickNumber: 0 },
      { score: 0, brickNumber: null },
      { score: 0, brickNumber: null },
      { score: 0, brickNumber: null },
      { score: 2, brickNumber: 0 },
    ]);
    expect(puzzle.board).toEqual(expectedBoardData);
  });
});
