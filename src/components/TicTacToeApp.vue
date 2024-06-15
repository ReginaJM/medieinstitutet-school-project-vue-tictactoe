<script setup lang="ts">
import Players from './Players.vue';
import Board from './Board.vue';
import VictoryCheck from './VictoryCheck.vue';
import { ref, onMounted, watch } from 'vue';



const playerX = ref<string>("");
const playerO = ref<string>("");
const showPlayers = ref<boolean>(true);
const playerXpoints = ref<number>(0);
const playerOpoints = ref<number>(0);

const playerXrow = ref<number[]>([]);
const playerOrow = ref<number[]>([]);
const totalMoves = ref<number[]>([]);

// //Function to save state to localStorage
const saveState = () => {
  const state = {
    playerX: playerX.value,
    playerO: playerO.value,
    playerXpoints: playerXpoints.value,
    playerOpoints: playerOpoints.value,
    playerXrow: playerXrow.value,
    playerOrow: playerOrow.value,
    totalMoves: totalMoves.value,
    showPlayers: showPlayers.value,
  };
  localStorage.setItem("ticTacToeState", JSON.stringify(state));
};

// //Function to load state from localStorage
const loadState = () => {
  const state = localStorage.getItem("ticTacToeState");
  if (state) {
    const parsedState = JSON.parse(state);
    playerX.value = parsedState.playerX;
    playerO.value = parsedState.playerO;
    playerXpoints.value = parsedState.playerXpoints;
    playerOpoints.value = parsedState.playerOpoints;
    playerXrow.value = parsedState.playerXrow;
    playerOrow.value = parsedState.playerOrow;
    totalMoves.value = parsedState.totalMoves;
    showPlayers.value = parsedState.showPlayers;
  }
};


const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  showPlayers.value = false; // Dölj Players-komponenten
  saveState(); // Save state after adding players
}

const updatePlayerRow = (playerAndIndex: { index: number; player: string }) => {
    totalMoves.value.push(1);
    if(playerAndIndex.player === 'X') {
        playerXrow.value.push(playerAndIndex.index)
    } else {
        playerOrow.value.push(playerAndIndex.index)
    }
    saveState(); // Save state after updating player row
}

const addPointPlayerX = () => {
    playerXpoints.value = playerXpoints.value += 1;
    saveState(); // Save state after updating points
}
const addPointPlayerO = () => {
    playerOpoints.value = playerOpoints.value += 1;
    saveState(); // Save state after updating points
}


///

const resetBoard = () => {
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  saveState(); // Save state after resetting the board
}

const handlePlayerXVictory = () => {
  addPointPlayerX();
  resetBoard();
}

const handlePlayerOVictory = () => {
  addPointPlayerO();
  resetBoard();
}

// // Load state on mounted
onMounted(() => {
  loadState();
});

// //Watch for changes in the state and save them
watch([playerX, playerO, playerXpoints, playerOpoints, playerXrow, playerOrow, totalMoves, showPlayers], saveState);




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
