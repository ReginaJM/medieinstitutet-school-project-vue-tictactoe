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
const gameOver = ref<boolean>(false); 



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
    gameOver: gameOver.value,
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
    gameOver.value = parsedState.gameOver;
  }
};


const addPlayerNames = (player1: string, player2: string) => {
  playerX.value = player1
  playerO.value = player2
  showPlayers.value = false; 
  saveState(); 
};

const updatePlayerRow = (playerAndIndex: { index: number; player: string }) => {
    if (!gameOver.value) {
        totalMoves.value.push(1);
        if(playerAndIndex.player === 'X') {
            playerXrow.value.push(playerAndIndex.index)
        } else {
            playerOrow.value.push(playerAndIndex.index)
        }
        saveState(); 
    }
};

const addPointPlayerX = () => {
    playerXpoints.value += 1;
    saveState(); 
};
const addPointPlayerO = () => {
    playerOpoints.value += 1;
    saveState(); 
};


///

const resetBoard = () => {
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  /* gameOver.value = false; // Återställ gameOver */
  saveState(); 
};

const handlePlayerXVictory = () => {
  addPointPlayerX();
  gameOver.value = true; // Sätt gameOver till true när en spelare vinner
  resetBoard();
};

const handlePlayerOVictory = () => {
  addPointPlayerO();
  gameOver.value = true; // Sätt gameOver till true när en spelare vinner
  resetBoard();
}

const startNewGame = () => {
  resetBoard();
  gameOver.value = false; // Återställ gameOver här
  /* saveState(); */
};

const resetGame = () => {
  localStorage.clear(); // Tömmer localStorage
  playerX.value = "";
  playerO.value = "";
  playerXpoints.value = 0;
  playerOpoints.value = 0;
  playerXrow.value = [];
  playerOrow.value = [];
  totalMoves.value = [];
  showPlayers.value = true;
  gameOver.value = false;
};

// // Load state on mounted
onMounted(() => {
  loadState();
});

// //Watch for changes in the state and save them
watch([playerX, playerO, playerXpoints, playerOpoints, playerXrow, playerOrow, totalMoves, showPlayers, gameOver], saveState);




</script>




<template>
    <div class="container">

    

        <Players v-if="showPlayers" @send-players="addPlayerNames"/>
        <Board v-else 
            :playerX="playerX"
            :playerO="playerO"
            :gameOver="gameOver" 
            @square-click="updatePlayerRow" 
            @clear-board="startNewGame"
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
        <!-- <button @click="startNewGame">Start New Game</button> -->
        <br>
        <button @click="resetGame">Reset Game</button>
    </div>

</template>




<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-height: 50%; */
  text-align: center;
}

</style>
