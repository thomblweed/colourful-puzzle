import { readInput } from './readInput';

async function main() {
  const [numColours, numColumns, bricks] = await readInput();

  const columns = Array(numColumns).fill(
    Array.from({ length: numColours }).fill(0)
  );

  bricks.forEach((brick) => {
    const { colours, scores } = brick;
    console.log({ brick });
  });

  // A placeholder algorithm
  // Print the score of the first brick
  //   console.log(bricks[0].scores.reduce((sum, score) => sum + score, 0));

  // Print the index of the first brick
  //   console.log('0');
}

main();
