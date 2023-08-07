import { Brick } from './types/brick.type';

type ColourRow = { score: number; brickNumber: number | null };

export class Puzzle {
  private _board: ColourRow[][];

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

  public addBricks(bricks: Brick[]) {
    bricks.forEach((brick, brickNumber) => {
      const { colours, scores } = brick;

      for (let i = 0; i < colours.length; i++) {
        this.updateFirstAvailableColumnRow(colours[i], brickNumber, scores[i]);
      }
    });
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
}
