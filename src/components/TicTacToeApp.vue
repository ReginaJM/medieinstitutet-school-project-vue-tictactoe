<script setup lang="ts">
import Players from './Players.vue'
import { ref } from 'vue';


const correctRows: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

// Ta emot myRow från child och jämföra med de korrekta alternativen genom att köra funktionen controlVictory
const myRow: number[] = [1, 2, 4, 5]


function checkVictory(correctRows: number[][], myRow: number[]): boolean {
    return correctRows.some(correctRow =>
        correctRow.every(element => myRow.includes(element))
    );
}
const result = checkVictory(correctRows, myRow);
console.log("vann?", result);



const playerX = ref<string>("");
const playerO = ref<string>("");

const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  console.log(playerX.value, playerO.value);
}

</script>




<template>

  <Players @send-players="addPlayerNames"/>

</template>




<style scoped>

</style>
