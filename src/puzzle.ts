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
      const { scores } = brick;

      this.addBrickToAvailableColumn(brick, brickNumber);
      const brickScore = this.getBrickScore(scores);
      this.updateScore(brickScore);
    });
  }

  private addBrickToAvailableColumn(brick: Brick, brickNumber: number) {
    const { colours, scores } = brick;
    for (let i = 0; i < colours.length; i++) {
      this.updateFirstAvailableColumnRow(colours[i], brickNumber, scores[i]);
    }
  }

  private updateFirstAvailableColumnRow(
    colour: number,
    brickNumber: number,
    score: number
  ): void {
    for (let i = 0; i < this._board.length; i++) {
      const column = this._board[i];
      if (column[colour].brickNumber === null) {
        column[colour] = { score, brickNumber };
        break;
      }
    }
  }

  private getBrickScore(scores: number[]): number {
    return scores.reduce((acc, score) => acc + score, 0);
  }

  private updateScore(brickScore: number) {
    this._score = this._score + brickScore;
  }
}
