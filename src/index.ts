import { Puzzle } from './puzzle';
import { readInput } from './readInput';

async function main() {
  const [numColours, numColumns, bricks] = await readInput();

  const puzzle = new Puzzle(numColours, numColumns);
  puzzle.addBricks(bricks);
  const score = puzzle.score;
  const rowsBrickNumbers = puzzle.getRowsBrickNumbers();

  console.log(score);
  rowsBrickNumbers.forEach((row) => {
    console.log(row.join(' '));
  });
}

main();
