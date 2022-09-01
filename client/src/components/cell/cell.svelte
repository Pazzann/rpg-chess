<script lang="ts">
    import styles from "./cell.module.css";
    import Cell from "../../classes/Cell";
    import {createEventDispatcher} from "svelte";
    export let cell: Cell;
    const selectDisp = createEventDispatcher();
    function select(){
        selectDisp("selectfigure", {
           cell: cell
        });
    }
</script>


<div class="cell" style="background: {cell.color}" on:click={select}>
    {#if cell.figure}
        <!--{cell.figure.canBeCaptured}-->
        <div class:capturable={cell.figure.canBeCaptured}>
            <img  src={"../../textures/" + cell.figure.imageSrc} alt={"Pawn"} />
        </div>
    {/if}
</div>