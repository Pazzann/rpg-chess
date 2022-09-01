import Figure from "../Figure";
import type {FigureColor, FigureColors} from "../../types-enums/Colors";
import type Cell from "../Cell";
import type {Vector2} from "../../Features/Vector2";

export default class Mark extends Figure{
    readonly color: FigureColor;
    public canBeCaptured: boolean = false;
    public position: Vector2;

    constructor(color: FigureColor) {
        super();
        this.color = color;
    }

    get imageSrc(): string {
        return "Mark.png";
    }
    canMoveFigure(cells: Cell[][], target: Vector2): boolean {
        return false;
    }
}