import Figure from "../Figure";
import {FigureColor, FigureColors} from "../../types-enums/Colors";
import type Cell from "../Cell";
import type {Vector2} from "../../Features/Vector2";

export default class Queen extends Figure {
    readonly color: FigureColor;
    public position: Vector2;
    public canBeCaptured: boolean = false;

    constructor(color: FigureColor) {
        super();
        this.color = color;
    }

    get imageSrc(): string {
        return this._src + ((this.color === FigureColors.WHITE) ? "WhiteQueen.png" : "BlackQueen.png");
    }

    canMoveFigure(cells: Cell[][], target: Vector2): boolean {
        if (target == this.position) {
            return false;
        }
        return true;
    }
}