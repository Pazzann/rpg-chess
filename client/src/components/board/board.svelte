<script lang="ts">
    import CellComponent from "../cell/cell.svelte";
    import styles from "./board.module.css";
    import GameBoard from "../../classes/Board";
    import {CellColors, FigureColors} from "../../types-enums/Colors";
    import {GameCodes} from "../../types-enums/GameCodes";
    import Pawn from "../../classes/Figures/Pawn";
    import Cell from "../../classes/Cell";

    let board = new GameBoard(5, 8);
    // board.initBoard(GameCodes.CLASSICBLACK);
    board.initBoard("+p==+r=/=+K===/+p+p+p==/+p+r+p==/+p+p===/=-K===/=====/=====")
    let lastSelected: Cell | null = null;

    function selectCell(e) {
        const targetCell: Cell = e.detail.cell;
        if (lastSelected) {
            if (lastSelected.position.y === targetCell.position.y && lastSelected.position.x === targetCell.position.x){
                board.cells[targetCell.position.x][targetCell.position.y].color = (targetCell.position.x + targetCell.position.y) % 2 ? CellColors.WHITE : CellColors.BLACK;
                board = board.unSelectAll();
            }
            else if (lastSelected.figure) {
                board = board.selectFigure(targetCell);
                board.cells[targetCell.position.x][targetCell.position.y].color = CellColors.ORANGE;
                board.cells[lastSelected.position.x][lastSelected.position.y].color = (lastSelected.position.x + lastSelected.position.y) % 2 ? CellColors.WHITE : CellColors.BLACK;

            } else if (targetCell.figure) {
                board = board.selectFigure(targetCell);
                board.cells[targetCell.position.x][targetCell.position.y].color = CellColors.ORANGE;
                board.cells[lastSelected.position.x][lastSelected.position.y].color = (lastSelected.position.x + lastSelected.position.y) % 2 ? CellColors.WHITE : CellColors.BLACK;
            } else {
                board.cells[targetCell.position.x][targetCell.position.y].color = CellColors.ORANGE;
                board.cells[lastSelected.position.x][lastSelected.position.y].color = (lastSelected.position.x + lastSelected.position.y) % 2 ? CellColors.WHITE : CellColors.BLACK;
                board = board.unSelectAll();
            }
        } else if (targetCell.figure) {
            board = board.selectFigure(targetCell);
        } else {
            board.cells[targetCell.position.x][targetCell.position.y].color = CellColors.ORANGE;
            board = board.unSelectAll();
        }
        lastSelected = targetCell;
        console.log(board.cells)
    }
</script>

<div class="board" style="width: {board.size.x * 64}px;height: {board.size.y * 64}px;">
    {#each board.cells as row}
        {#each row as item}
            <CellComponent cell={item} on:selectfigure={selectCell}></CellComponent>
        {/each}
    {/each}
</div>
