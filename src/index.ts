import { Puzzle } from './puzzle';
import { readInput } from './readInput';

async function main() {
  const [numColours, numColumns, bricks] = await readInput();

  const puzzle = new Puzzle(numColours, numColumns);
  puzzle.addBricks(bricks);
  const score = puzzle.score;
  const columnsBrickNumbers = puzzle.getColumnsBrickNumbers();

  console.log(score);
  columnsBrickNumbers.forEach((column) => {
    const columnNumbers = column.join(' ');
    console.log(columnNumbers);
  });
}

main();
