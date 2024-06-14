<script setup lang="ts">
import Players from './Players.vue';
import Board from './Board.vue';
import VictoryCheck from './VictoryCheck.vue';
import { ref } from 'vue';



const playerX = ref<string>("");
const playerO = ref<string>("");
const showPlayers = ref<boolean>(true);

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
    />

</template>




<style scoped>

</style>
