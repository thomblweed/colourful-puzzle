import { Brick } from './types/brick.type';

type ColourRow = { score: number; brickNumber: number | null };

export class Puzzle {
  private _board: ColourRow[][];

  constructor(numColours: number, numColumns: number) {
    this._board = Array(numColumns).fill(
      Array.from({ length: numColours }).fill({ score: 0, brickNumber: null })
    );
  }

  public get board() {
    return this._board;
  }

  public addBricks(bricks: Brick[]) {
    bricks.forEach((brick, brickNumber) => {
      const { colours, scores } = brick;
      console.log({ colours });

      for (let i = 0; i < colours.length; i++) {
        this.updateFirstAvailableColumnRow(colours[i], brickNumber, scores[i]);
      }

      this._board.forEach((column) => {
        console.log({ ALL: column });
      });
    });
  }

  private updateFirstAvailableColumnRow(
    colour: number,
    brickNumber: number,
    score: number
  ): void {
    for (let i = 0; i < this.board.length; i++) {
      const column = this.board[i];
      const colourRow = column[colour];
      console.log({ BEFORE: column });
      if (colourRow.brickNumber === null) {
        const updatedColourRow: ColourRow = { score, brickNumber };
        column.splice(colour, 1, updatedColourRow);
        console.log({ AFTER: column });
        break;
      }
    }
  }
}
