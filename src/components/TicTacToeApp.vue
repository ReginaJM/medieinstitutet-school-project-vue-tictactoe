<script setup lang="ts">
import Players from './Players.vue';
import Board from './Board.vue';
import VictoryCheck from './VictoryCheck.vue';
import { ref, onMounted } from 'vue';



const playerX = ref<string>("");
const playerO = ref<string>("");
const showPlayers = ref<boolean>(true);
const playerXpoints = ref<number>(0);
const playerOpoints = ref<number>(0);

const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  showPlayers.value = false; // Dölj Players-komponenten
}

const playerXrow = ref<number[]>([]);
const playerOrow = ref<number[]>([]);
const totalMoves = ref<number[]>([]);


const updatePlayerRow = (playerAndIndex: { index: number; player: string }) => {
    totalMoves.value.push(1);
    if(playerAndIndex.player === 'X') {
        playerXrow.value.push(playerAndIndex.index)
    } else {
        playerOrow.value.push(playerAndIndex.index)
    }
}

const addPointPlayerX = () => {
    playerXpoints.value = playerXpoints.value += 1;
}
const addPointPlayerO = () => {
    playerOpoints.value = playerOpoints.value += 1;
}


///

const resetBoard = () => {
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
}

const handlePlayerXVictory = () => {
  addPointPlayerX();
  resetBoard();
}

const handlePlayerOVictory = () => {
  addPointPlayerO();
  resetBoard();
}


</script>




<template>

    <Players v-if="showPlayers" @send-players="addPlayerNames"/>
    <Board v-else 
        :playerX="playerX"
        :playerO="playerO"
        @square-click="updatePlayerRow" 
    />

    <VictoryCheck v-for="(t, i) in totalMoves" :key="i"
        :playerX="playerX"
        :playerO="playerO"
        :playerXrow="playerXrow"
        :playerOrow="playerOrow"
        @playerXVictory="handlePlayerXVictory"
        @playerOVictory="handlePlayerOVictory"
        @resetBoard="resetBoard"
    />

    <p>x tot {{ playerXpoints }}</p>
    <p>o tot {{ playerOpoints }}</p>
    

</template>




<style scoped>

</style>
