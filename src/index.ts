import { Puzzle } from './puzzle';
import { readInput } from './readInput';

async function main() {
  const [numColours, numColumns, bricks] = await readInput();

  const puzzle = new Puzzle(numColours, numColumns);
  puzzle.addBricks(bricks);
  const totalPuzzleScore = puzzle.score;
  const columnsBrickNumbers = puzzle.getColumnsBrickNumbers();

  console.log(totalPuzzleScore);

  columnsBrickNumbers.forEach((column) => {
    const columnBrickNumbers = column.join(' ');
    console.log(columnBrickNumbers);
  });
}

main();
