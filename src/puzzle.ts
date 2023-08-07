import { test } from 'node:test';
import { Brick } from './types/brick.type';

type ColourRow = { score: number; brickNumber: number | null };

export class Puzzle {
  private _board: ColourRow[][];
  private _score = 0;
  private _allBricks: Brick[] = [];
  private _sortedBricksByHighestScore: Brick[] = [];

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

  public get sortedBricksByHighestScore() {
    return this._sortedBricksByHighestScore;
  }

  public addBricks(bricks: Brick[]) {
    this._allBricks = bricks;
    this._sortedBricksByHighestScore = this.sortBricksByHighestScore();
    // bricks.forEach((brick, brickNumber) => {
    //   this.addBrickToAvailableColumn(brick, brickNumber);
    // });
    this._sortedBricksByHighestScore.forEach((brick, brickNumber) => {
      this.addBrickToAvailableColumn(brick, brickNumber);
    });
  }

  private sortBricksByHighestScore() {
    return this._allBricks
      .sort((a, b) => {
        return (
          a.scores.reduce((a, b) => a + b, 0) -
          b.scores.reduce((a, b) => a + b, 0)
        );
      })
      .reverse();
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
