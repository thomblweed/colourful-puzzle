import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { Puzzle } from './puzzle';
import { Brick } from './types/brick.type';

const instantiatedBoardData = Array.from({ length: 4 }, () =>
  Array.from({ length: 5 }).fill({ score: 0, brickNumber: null })
);
let expectedBoardData = [...instantiatedBoardData];
const numColours = 5;
const numColumns = 4;

describe('When creating a new puzzle with 5 colour rows and 4 columns', () => {
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

  it('should have initial board score of 0', () => {
    expect(puzzle.score).toBe(0);
  });
});

describe('When adding a single brick to the board', () => {
  const brick: Brick = {
    colours: [0, 4],
    scores: [3, 2],
    number: 0,
  };
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Puzzle(numColours, numColumns);
    puzzle.addBricks([brick]);
  });
  afterEach(() => {
    expectedBoardData = [...instantiatedBoardData];
  });

  it('should add brick to the first available colour column from the farthest right of the board', () => {
    expectedBoardData.splice(3, 1, [
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

describe('When adding a second brick that is compatible with first brick', () => {
  const bricks: Brick[] = [
    {
      colours: [0, 4],
      scores: [3, 2],
      number: 0,
    },
    {
      colours: [1],
      scores: [4],
      number: 1,
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

  it('should sort bricks by highest score', () => {
    const expectedSortedBricks = [
      { colours: [0, 4], scores: [3, 2], number: 0 },
      { colours: [1], scores: [4], number: 1 },
    ];

    expect(puzzle.sortedBricksByHighestScore).toEqual(expectedSortedBricks);
  });

  it('should add both bricks to the same available column', () => {
    expectedBoardData.splice(3, 1, [
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

describe('When adding a second brick that is NOT compatible with first brick', () => {
  const bricks: Brick[] = [
    {
      colours: [0, 4],
      scores: [3, 2],
      number: 0,
    },
    {
      colours: [0],
      scores: [4],
      number: 1,
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

  it('should sort bricks by highest score', () => {
    const expectedSortedBricks = [
      { colours: [0, 4], scores: [3, 2], number: 0 },
      { colours: [0], scores: [4], number: 1 },
    ];

    expect(puzzle.sortedBricksByHighestScore).toEqual(expectedSortedBricks);
  });

  it('should add second bricks to the next available left column for that colour', () => {
    expectedBoardData.splice(
      2,
      2,
      [
        { score: 4, brickNumber: 1 },
        { score: 0, brickNumber: null },
        { score: 0, brickNumber: null },
        { score: 0, brickNumber: null },
        { score: 0, brickNumber: null },
      ],
      [
        { score: 3, brickNumber: 0 },
        { score: 0, brickNumber: null },
        { score: 0, brickNumber: null },
        { score: 0, brickNumber: null },
        { score: 2, brickNumber: 0 },
      ]
    );

    expect(puzzle.board).toEqual(expectedBoardData);
  });

  it('should tally correct board score', () => {
    expect(puzzle.score).toBe(9);
  });
});

describe('When adding all the required bricks for the puzzle', () => {
  const bricks: Brick[] = [
    {
      colours: [0, 4],
      scores: [3, 2],
      number: 0,
    },
    {
      colours: [4],
      scores: [2],
      number: 1,
    },
    {
      colours: [3, 4],
      scores: [2, 9],
      number: 2,
    },
    {
      colours: [0],
      scores: [3],
      number: 3,
    },
    {
      colours: [1],
      scores: [4],
      number: 4,
    },
    {
      colours: [0, 2],
      scores: [3, 9],
      number: 5,
    },
    {
      colours: [0, 1],
      scores: [3, 1],
      number: 6,
    },
    {
      colours: [3],
      scores: [4],
      number: 7,
    },
    {
      colours: [0, 1],
      scores: [1, 2],
      number: 8,
    },
    {
      colours: [3],
      scores: [9],
      number: 9,
    },
    {
      colours: [2, 4],
      scores: [1, 1],
      number: 10,
    },
    {
      colours: [3],
      scores: [2],
      number: 11,
    },
    {
      colours: [2, 3],
      scores: [9, 1],
      number: 12,
    },
    {
      colours: [1],
      scores: [5],
      number: 13,
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

  it('should sort bricks by highest score', () => {
    const expectedSortedBricks = [
      { colours: [0, 2], scores: [3, 9], number: 5 },
      { colours: [3, 4], scores: [2, 9], number: 2 },
      { colours: [2, 3], scores: [9, 1], number: 12 },
      { colours: [3], scores: [9], number: 9 },
      { colours: [1], scores: [5], number: 13 },
      { colours: [0, 4], scores: [3, 2], number: 0 },
      { colours: [3], scores: [4], number: 7 },
      { colours: [0, 1], scores: [3, 1], number: 6 },
      { colours: [1], scores: [4], number: 4 },
      { colours: [0, 1], scores: [1, 2], number: 8 },
      { colours: [0], scores: [3], number: 3 },
      { colours: [3], scores: [2], number: 11 },
      { colours: [2, 4], scores: [1, 1], number: 10 },
      { colours: [4], scores: [2], number: 1 },
    ];

    expect(puzzle.sortedBricksByHighestScore).toEqual(expectedSortedBricks);
  });

  it('should add all bricks to the correct columns', () => {
    expectedBoardData = [
      [
        { score: 3, brickNumber: 3 },
        { score: 0, brickNumber: null },
        { score: 1, brickNumber: 10 },
        { score: 4, brickNumber: 7 },
        { score: 1, brickNumber: 10 },
      ],
      [
        { score: 3, brickNumber: 6 },
        { score: 1, brickNumber: 6 },
        { score: 0, brickNumber: null },
        { score: 9, brickNumber: 9 },
        { score: 2, brickNumber: 1 },
      ],
      [
        { score: 3, brickNumber: 0 },
        { score: 4, brickNumber: 4 },
        { score: 9, brickNumber: 12 },
        { score: 1, brickNumber: 12 },
        { score: 2, brickNumber: 0 },
      ],
      [
        { score: 3, brickNumber: 5 },
        { score: 5, brickNumber: 13 },
        { score: 9, brickNumber: 5 },
        { score: 2, brickNumber: 2 },
        { score: 9, brickNumber: 2 },
      ],
    ];

    expect(puzzle.board).toEqual(expectedBoardData);
  });

  it('should tally correct highest possible board score', () => {
    expect(puzzle.score).toBe(71);
  });
});
