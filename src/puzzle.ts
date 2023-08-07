import { Brick } from './types/brick.type';

type ColourRow = { score: number; brickNumber: number | null };

export class Puzzle {
  private _board: ColourRow[][];
  private _score = 0;

  constructor(numColours: number, numColumns: number) {
    this._board = Array.from({ length: numColumns }, () =>
      Array.from<ColourRow>({ length: numColours }).fill({
        score: 0,
        brickNumber: null,
      })
    );
  }

  public get board() {
    return this._board;
  }

  public get score() {
    return this._score;
  }

  public addBricks(bricks: Brick[]) {
    bricks.forEach((brick, brickNumber) => {
      this.addBrickToAvailableColumn(brick, brickNumber);
    });
  }

  private addBrickToAvailableColumn(brick: Brick, brickNumber: number) {
    const { colours, scores } = brick;
    for (let i = 0; i < this._board.length; i++) {
      const column = this._board[i];
      const isColumnCompatible = colours.every((colour) => {
        return column[colour].brickNumber === null;
      });

      if (isColumnCompatible) {
        this.updateColumnAndScore(colours, column, scores, brickNumber);
        break;
      }
    }
  }

  private updateColumnAndScore(
    colours: number[],
    column: ColourRow[],
    scores: number[],
    brickNumber: number
  ) {
    colours.forEach((colour, colourIndex) => {
      column[colour] = {
        score: scores[colourIndex],
        brickNumber,
      };
    });
    const brickScore = this.calculateBrickScore(scores);
    this.updateScore(brickScore);
  }

  private calculateBrickScore(scores: number[]): number {
    return scores.reduce((currentScore, score) => currentScore + score, 0);
  }

  private updateScore(brickScore: number) {
    this._score = this._score + brickScore;
  }

  public getColumnsBrickNumbers() {
    return this._board.map((column) => {
      const bricksWithNumbers = column.filter(
        (colourRow) => colourRow.brickNumber !== null
      );
      const distinctBrickNumbers = Array.from(
        new Set(bricksWithNumbers.map((colourRow) => colourRow.brickNumber))
      );

      return distinctBrickNumbers;
    });
  }
}
