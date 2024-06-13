<script setup lang="ts">



</script>





<template>

    <div class="game-board">
        <div class="cell" id="cell-0"></div>
        <div class="cell" id="cell-1"></div>
        <div class="cell" id="cell-2"></div>
        <div class="cell" id="cell-3"></div>
        <div class="cell" id="cell-4"></div>
        <div class="cell" id="cell-5"></div>
        <div class="cell" id="cell-6"></div>
        <div class="cell" id="cell-7"></div>
        <div class="cell" id="cell-8"></div>
    </div>

</template>



<style scoped>

.game-board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
}

.cell {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    cursor: pointer;
    user-select: none;
}

.cell:hover {
    background-color: #e0e0e0;
}

</style>
