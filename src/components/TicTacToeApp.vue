<script setup lang="ts">
import Players from './Players.vue';
import Board from './Board.vue';
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
const showPlayers = ref<boolean>(true);

const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  showPlayers.value = false; // Dölj Players-komponenten
  console.log(playerX.value, playerO.value);
}


const playerXrow = ref<number[]>([]);
const playerOrow = ref<number[]>([]);
console.log('x', playerXrow.value);
console.log('o', playerOrow.value);


const updatePoints = (playerAndIndex: { index: number; player: string }) => {
    if(playerAndIndex.player === 'X') {
        playerXrow.value.push(playerAndIndex.index)
    } else {
        playerOrow.value.push(playerAndIndex.index)
    }
}

</script>




<template>

    <Players v-if="showPlayers" @send-players="addPlayerNames"/>
    <Board v-else 
        :playerX="playerX"
        :playerO="playerO"
        @square-click="updatePoints" 
    />

    X {{ playerXrow }}
    O {{ playerOrow }}

</template>




<style scoped>

</style>
