import type {FigureColor} from "../types-enums/Colors";
import type Cell from "./Cell";
import type {Vector2} from "../Features/Vector2";

export default abstract class Figure{
    protected _src: string = "../../textures/";
    protected abstract position: Vector2;
    public abstract canBeCaptured: boolean;
    public abstract get imageSrc(): string;
    public canMove(cells: Cell[][], target: Vector2): boolean{
        return this.canMoveFigure(cells, target);
    }
    protected abstract canMoveFigure(cells: Cell[][], target: Vector2): boolean;
    readonly color: FigureColor;
}