import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Puzzle } from './puzzle';

const instantiatedBoardData = Array.from({ length: 4 }, () =>
  Array.from({ length: 5 }).fill({ score: 0, brickNumber: null })
);
let expectedBoardData = [...instantiatedBoardData];
const numColours = 5;
const numColumns = 4;

describe('When creating a new board', () => {
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

  it('should tally correct board score of 0', () => {
    expect(puzzle.score).toBe(0);
  });
});

describe('When adding a single brick to the board', () => {
  const brick = {
    colours: [0, 4],
    scores: [3, 2],
  };
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

  it('should tally correct board score', () => {
    expect(puzzle.score).toBe(5);
  });
});

describe('When adding a second brick that compatible first brick', () => {
  const bricks = [
    {
      colours: [0, 4],
      scores: [3, 2],
    },
    {
      colours: [1],
      scores: [4],
    },
  ];
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(numColours, numColumns);
    puzzle.addBricks(bricks);
  });
  afterEach(() => {
    expectedBoardData = [...instantiatedBoardData];
  });

  it('should add both bricks to the same available column', () => {
    expectedBoardData.splice(0, 1, [
      { score: 3, brickNumber: 0 },
      { score: 4, brickNumber: 1 },
      { score: 0, brickNumber: null },
      { score: 0, brickNumber: null },
      { score: 2, brickNumber: 0 },
    ]);

    expect(puzzle.board).toEqual(expectedBoardData);
  });

  it('should tally correct board score', () => {
    expect(puzzle.score).toBe(9);
  });
});
