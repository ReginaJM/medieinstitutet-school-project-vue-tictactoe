<script setup lang="ts">
import { ref } from 'vue';


const correctRows: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/* const props = defineProps<{
  playerXrow: number[];
  playerOrow: number[];
  playerX: string;
  playerO: string;
}>();
 */


// Det barnet vill ha av föräldern
interface IVictoryCheckProps {
  playerX: string;
  playerO: string;
  playerXrow: number[];
  playerOrow: number[];
}
const props = defineProps<IVictoryCheckProps>();





const checkVictory = (correctRows: number[][], playerRow: number[]): boolean => {
    return correctRows.some(correctRow =>
        correctRow.every(element => playerRow.includes(element))
    );
}
const resultPlayerX = checkVictory(correctRows, props.playerXrow);
const resultPlayerO = checkVictory(correctRows, props.playerOrow);


</script>





<template>

<div>
    <p v-if="resultPlayerX">Player X, {{ playerX }} you are the winner! &#129395;</p>
    <p v-if="resultPlayerO">Player O, {{ playerO }} you are the winner! &#129395;</p>
</div>

</template>







<style scoped>

</style>
