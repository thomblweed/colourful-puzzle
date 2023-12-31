import * as readline from 'readline';

import { Brick } from './types/brick.type';

export const readInput = async (): Promise<[number, number, Brick[]]> => {
  const lines: string[] = [];
  const rl = readline.createInterface({
    input: process.stdin,
  });

  for await (const line of rl) {
    lines.push(line);
  }

  rl.close();

  if (lines.length === 0) {
    throw new Error('Input is empty');
  }

  const problemData = lines[0].split(' ');
  if (problemData.length !== 3) {
    throw new Error('Problem description is invalid');
  }

  const numColours = parseInt(problemData[0], 10);
  const numRows = parseInt(problemData[1], 10);
  const numBricks = parseInt(problemData[2], 10);

  const bricks: Brick[] = [];
  for (let idx = 1; idx < lines.length; idx++) {
    const blockData = lines[idx].split(' ').map(Number);

    const colours = blockData.filter((_, i) => i % 2 === 0);
    const scores = blockData.filter((_, i) => i % 2 !== 0);

    bricks.push({
      colours,
      scores,
      number: idx - 1,
    });
  }

  return [numColours, numRows, bricks];
};
