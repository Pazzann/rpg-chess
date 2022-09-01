import Cell from "./Cell";
import {CellColors, FigureColor, FigureColors} from "../types-enums/Colors";
import {Vector2} from "../Features/Vector2";
import Pawn from "./Figures/Pawn";
import Queen from "./Figures/Queen";
import type {GameFigure} from "../types-enums/GameFigure";
import Rook from "./Figures/Rook";
import Knight from "./Figures/Knight";
import Bishop from "./Figures/Bishop";
import King from "./Figures/King";
import Mark from "./Figures/Mark";

export default class GameBoard {
    public cells: Cell[][];
    public size: Vector2;

    constructor(x: number, y: number) {
        this.size = new Vector2(x, y);
        this.cells = [];
        for (let i = 0; i < y; i++) {
            let cellColumn: Cell[] = [];
            for (let j = 0; j < x; j++) {
                cellColumn.push(new Cell(i, j, null, ((j + i) % 2 ? CellColors.WHITE : CellColors.BLACK)));
            }
            this.cells.push(cellColumn);
        }
    }

    public initBoard(code: string) {
        if (this.validateCellCode(code)) {
            code.split('/').map(
                (item, y) => {
                    let k = 0;
                    for (let i = 0; i < this.size.x; i++) {
                        switch (item[k]) {
                            case "+": {
                                this.cells[y][i].figure = GameBoard.figureSelector(FigureColors.BLACK, item[k + 1]);
                                k += 2;
                                break;
                            }
                            case "-": {
                                this.cells[y][i].figure = GameBoard.figureSelector(FigureColors.WHITE, item[k + 1]);
                                k += 2;
                                break;
                            }
                            case "=": {
                                k++;
                                break;
                            }
                        }
                    }
                }
            );
        } else {
            throw new Error("CODE IS INVALID!");
        }
        return this;
    }

    public selectFigure(selectCell: Cell): GameBoard {
        if (!selectCell.figure)
            return this

        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                if (this.cells[i][j].figure)
                    this.cells[i][j].figure.canBeCaptured = false;
                if (this.cells[i][j].figure instanceof Mark)
                    this.cells[i][j].figure = null;
                if (selectCell.figure.canMove(this.cells, this.cells[i][j].position))
                    this.cells[i][j].figure = new Mark(FigureColors.WHITE);
            }
        }
        return this;
    }
    public unSelectAll(){
        for (let i = 0; i < this.size.y; i++) {
            for (let j = 0; j < this.size.x; j++) {
                if (this.cells[i][j].figure)
                    this.cells[i][j].figure.canBeCaptured = false;
                if (this.cells[i][j].figure instanceof Mark)
                    this.cells[i][j].figure = null;
            }
        }
        return this;
    }


    private static figureSelector(color: FigureColor, figureCode: string): GameFigure {
        switch (figureCode) {
            case "r":
                return new Rook(color)
            case "k":
                return new Knight(color)
            case "b":
                return new Bishop(color)
            case "q":
                return new Queen(color)
            case "K":
                return new King(color)
            case "p":
                return new Pawn(color)
        }
    }

    private validateCellCode(code: string): boolean {
        if (code.split("/").length !== this.size.y)
            return false;
        let codeWithoutColors = code.split('+').join('').split('-').join('');
        let valid = true;
        codeWithoutColors.split("/").map(item => {
            if (item.length !== this.size.x) {
                valid = false
                return false;
            }
        });
        if (!valid)
            return valid;
        let codeWithColors = code.split('/').join('').split('=').join('').split('');
        if (codeWithColors[0] !== "+" && codeWithColors[0] !== "-")
            return false;
        let previous = false;
        for (let i = 0; i < codeWithColors.length; i++) {
            switch (codeWithColors[i]) {
                case "+":
                case "-": {
                    if (previous)
                        return false;
                    previous = true;
                    break;
                }
                default: {
                    if (!previous)
                        return false;
                    previous = false;
                    break;
                }
            }
        }
        return true;
    }
}
