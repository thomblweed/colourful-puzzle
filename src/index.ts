import { readInput } from './readInput';

async function main() {
  const [numColors, numRows, bricks] = await readInput();

  // A placeholder algorithm
  // Print the score of the first brick
  console.log(bricks[0].scores.reduce((sum, score) => sum + score, 0));

  // Print the index of the first brick
  console.log('0');
}

main();
