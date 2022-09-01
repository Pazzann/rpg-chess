import Figure from "../Figure";
import {FigureColor, FigureColors} from "../../types-enums/Colors";
import type Cell from "../Cell";
import type {Vector2} from "../../Features/Vector2";

export default class Bishop extends Figure{
    readonly color: FigureColor;
    public position: Vector2;
    public canBeCaptured: boolean = false;

    constructor(color: FigureColor) {
        super();
        this.color = color;
    }

    get imageSrc(): string {
        return this._src + ((this.color === FigureColors.WHITE) ? "WhiteBishop.png" : "BlackBishop.png");
    }
    canMoveFigure(cells: Cell[][], target: Vector2): boolean {
        if (target == this.position) {
            return false;
        }
        if (Math.abs(target.x - this.position.x) != Math.abs(target.y - this.position.y)) {
            return false;
        }
        for (let x = Math.min(this.position.x, target.x) + 1; x < Math.max(this.position.x, target.x); x++) {
            for (let y = Math.min(this.position.y, target.y) + 1; x < Math.max(this.position.y, target.y); y++) {
                if (cells[x][y].figure != null) {
                    return false;
                }
            }
        }
        if (cells[target.x][target.y].figure != null) {
            if (cells[target.x][target.y].figure.color == this.color) {
                return false;
            } else {
                cells[target.x][target.y].figure.canBeCaptured = true;
                return false;
            }
        } else {
            return true;
        }
    }
}