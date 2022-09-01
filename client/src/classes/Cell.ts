import {Vector2} from "../Features/Vector2";
import type Figure from "./Figure";
import type {CellColors, FigureColor} from "../types-enums/Colors";
import type {GameFigure} from "../types-enums/GameFigure";

export default class Cell{
    readonly position: Vector2;
    private _figure: GameFigure | null;
    public color: CellColors;
    set figure(figure: GameFigure | null){
        this._figure = figure;
        if(this._figure)
            this._figure.position = this.position;
    }
    get figure(){
        return this._figure;
    }


    constructor(x: number, y: number, figure: GameFigure | null, color: CellColors) {
        this.position = new Vector2(x, y);
        this._figure = figure;
        if(this._figure)
            this._figure.position = this.position;
        this.color = color;
    }
}